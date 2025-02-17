from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain
from langchain_community.tools import QuerySQLDatabaseTool
from operator import itemgetter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint

import re
# 환경 변수 로드
load_dotenv()

# PostgreSQL 연결 설정
pg_uri = os.getenv("PG_URI")

db = SQLDatabase.from_uri(pg_uri)

# Hugging Face LLM 설정
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
repo_id = 'mistralai/Mistral-7B-v0.1'
llm = HuggingFaceEndpoint(
    endpoint_url=f"https://api-inference.huggingface.co/models/{repo_id}",
    huggingfacehub_api_token=HUGGINGFACE_API_KEY,
    task="text-generation",
    max_new_tokens=512,  
    temperature=0.2  
)

# LangChain SQL Query Chain 설정
write_query = create_sql_query_chain(llm, db)
execute_query = QuerySQLDatabaseTool(db=db)
table_info = db.get_table_info()

# SQL 실행 후 자연어 응답을 생성하는 프롬프트
answer_prompt = PromptTemplate.from_template(
    """pt예약 데이터베이스의 테이블 정보는 다음과 같습니다:
    {table_info}
    질문에 대해 적절한 SQL 쿼리를 생성하고 실행하여 결과를 제공하세요.

    Question: {question}
    SQL Query: {query}
    SQL Result: {result}
    Answer: """
)

parser = StrOutputParser()
answer = answer_prompt | llm | parser

# 체인 구성
chain = (
    RunnablePassthrough.assign(query=write_query)
    .assign(result=itemgetter("query") | execute_query)
    | answer
)
def chat_with_bot(question: str):
    try:
        response = chain.invoke({"question": question, "table_info": table_info})
        match = re.search(r"Answer:\s*(.*)", response)
        if match:
            answer_text = match.group(1).strip()
        else:
            answer_text = response.strip()
        return {"answer": answer_text}
    except Exception as e:
        return {"error": str(e)}
# FastAPI 앱 생성
app = FastAPI()

# CORS 설정 (EC2에서 클라이언트 접근 가능하도록 설정)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 필요에 따라 특정 도메인으로 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(question: str):
    try:
        response = chain.invoke({"question": question, "table_info": table_info})
        
        
        match = re.search(r"Answer:\s*(.*)", response)
        if match:
            answer_text = match.group(1).strip()
        else:
            answer_text = response.strip()  # 매칭이 안 될 경우 전체 응답 반환

        return {"answer": answer_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 기본 라우트 추가
@app.get("/")
async def root():
    return {"message": "FastAPI LangChain Server Running"}

