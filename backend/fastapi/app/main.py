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
import shutil
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
        # 1. 업로드된 파일을 로컬에 저장 (Windows 환경 대응)
        temp_video_path = f"temp_{file.filename}"
        with open(temp_video_path, "wb") as temp_video_file:
            shutil.copyfileobj(file.file, temp_video_file)

        # 2. OpenCV에서 영상 열기
        cap = cv2.VideoCapture(temp_video_path)
        if not cap.isOpened():
            raise HTTPException(status_code=400, detail="영상을 열 수 없습니다.")

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')

        # 3. 분석된 영상을 저장할 임시 파일 생성
        output_video_path = f"analyzed_{file.filename}"
        out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            # 여기에 분석 코드 추가
            # results = analyze_pose(frame)
            # annotated_frame = draw_pose_landmarks(frame, results)
            # 임시로 원본 그대로 저장
            out.write(frame)

        cap.release()
        out.release()

        # 4. MinIO에 업로드
        analyzed_filename = f"fastapi/analyze/pose_{file.filename}"
        minio_client.upload_file(output_video_path, MINIO_BUCKET_NAME, analyzed_filename, ExtraArgs={"ContentType": "video/mp4"})

        # 5. Presigned URL 생성
        presigned_url = minio_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": MINIO_BUCKET_NAME, "Key": analyzed_filename},
            ExpiresIn=3600  # 1시간 동안 유효
        )

        # 6. 로컬 임시 파일 삭제
        os.remove(temp_video_path)
        os.remove(output_video_path)

        # 7. Presigned URL 반환
        return JSONResponse(content={"video_url": presigned_url}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/api/analyze/{filename}")
async def get_video_url(filename: str):
    """MinIO에서 분석된 영상의 URL 반환"""
    video_url = f"http://{MINIO_ENDPOINT}/{MINIO_BUCKET_NAME}/fastapi/analyze/{filename}"
    return FileResponse(video_url, media_type="video/mp4")

