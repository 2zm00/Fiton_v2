from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse ,FileResponse
import cv2
import mediapipe as mp
import numpy as np
import os
from dotenv import load_dotenv
from minio import Minio
from io import BytesIO
import tempfile
from app.pose import analyze_pose, draw_pose_landmarks,minio_client
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.chat import chat_with_bot

load_dotenv()
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT") #실제 서버
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY")
MINIO_BUCKET_NAME = os.getenv("MINIO_BUCKET_NAME")

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 필요에 따라 특정 도메인으로 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat/")
async def chat_endpoint(question: str):
    try:
        response = chat_with_bot(question)
        return JSONResponse(content=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/api/analyze")
async def analyze_video(file: UploadFile = File(...)):
    """업로드된 영상을 분석하고 MinIO에 저장"""
    try:
        print(" 파일 업로드 시작") #로그 추가

        # 1️ 파일을 임시 디렉토리에 저장
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_video_file: #1번
            temp_video_path = temp_video_file.name
            temp_video_file.write(await file.read())

        print(f" Temp video file saved at: {temp_video_path}")  # 로그 추가

        # OpenCV에서 임시 파일 경로로 영상 열기
        cap = cv2.VideoCapture(temp_video_path) #2번 

        # 2️ OpenCV에서 임시 파일 경로로 영상 열기
        if not cap.isOpened():
            raise HTTPException(status_code=400, detail="영상을 열 수 없습니다.")

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'avc1')

        # 3 분석된 영상 저장을 위한 임시 파일 생성
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_output_file:
            output_video_path = temp_output_file.name #3번

        out = cv2.VideoWriter(output_video_path , fourcc, fps, (width, height)) #4번

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = analyze_pose(frame)
            annotated_frame = draw_pose_landmarks(frame, results)
            out.write(annotated_frame)

        cap.release()
        out.release()

        # # 메타데이터 설정
        # metadata = {
        # 'Content-Type': 'video/mp4'}
       
        
        # 5. MinIO에 업로드
        # output_video.seek(0)
        analyzed_filename = f"fastapi/analyze/pose_{file.filename}"
        minio_client.fput_object(
            MINIO_BUCKET_NAME, analyzed_filename, output_video_path, content_type= "video/mp4" #metadata=metadata
        )

        # 6.영상 URL 반환
        video_url = f"http://{MINIO_ENDPOINT}/{MINIO_BUCKET_NAME}/{analyzed_filename}"
        return JSONResponse(content={"message": "운동 자세 분석 완료!", "video_url": video_url})

        # return FileResponse(video_url, media_type="video/mp4")

        # 7️ 임시 파일 삭제 (메모리 관리)
        # os.remove(temp_video_path)
        # os.remove(output_video_path)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/api/analyze/{filename}")
async def get_video_url(filename: str):
    """MinIO에서 분석된 영상의 URL 반환"""
    video_url = f"http://{MINIO_ENDPOINT}/{MINIO_BUCKET_NAME}/fastapi/analyze/{filename}"
    return JSONResponse(content={"video_url": video_url})

    # return FileResponse(video_url, media_type="video/mp4")

