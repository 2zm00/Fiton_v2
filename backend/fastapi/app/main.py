from fastapi import FastAPI
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from operator import itemgetter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
import os
import re
from dotenv import load_dotenv
from langchain.llms import HuggingFaceHub
load_dotenv()

pg_uri = os.getenv("pg_uri")
db = SQLDatabase.from_uri(pg_uri)
repo_id = 'mistralai/Mistral-7B-v0.1'
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
# Hugging Face LLM을 LangChain에 적용
llm = HuggingFaceHub(
    repo_id=repo_id,
    huggingfacehub_api_token=HUGGINGFACE_API_KEY,
    model_kwargs={"temperature": 0.2, 
                  "max_length": 1280}
)

# LangChain SQL Query Chain 생성
write_query = create_sql_query_chain(llm, db)
execute_query = QuerySQLDataBaseTool(db=db)
table_info = db.get_table_info()
answer_prompt = PromptTemplate.from_template(
    """

    주어진 유저 질문에 대해서, 적절한 SQL 쿼리를 생성하고 실행하여 결과를 제공하세요.
    Question: {question}
    SQL Query: {query}
    SQL Result: {result}
    Answer: """
)

parser = StrOutputParser()
answer = answer_prompt | llm | parser

chain = (
    RunnablePassthrough.assign(query=write_query).assign(
        result=itemgetter("query") | execute_query
    )
    | answer
)

app = FastAPI()

def extract_answer(response_text: str) -> str:
    match = re.search(r"Answer:\s*(.*)", response_text, re.DOTALL)
    return match.group(1).strip() if match else response_text.strip()

@app.post("/chat")
async def chat(question: str):
    response = chain.invoke({"question": question, "table_info": table_info})
    extracted_answer = extract_answer(response)  # 정규 표현식으로 Answer 부분만 추출
    return {"answer": extracted_answer}