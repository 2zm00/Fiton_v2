from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
import cv2
import mediapipe as mp
import numpy as np
import os
from dotenv import load_dotenv
from minio import Minio
from io import BytesIO

# 현재 파일(`pose.py`) 기준으로 `.env` 파일의 절대 경로 찾기
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # `fastapi/` 폴더 위치
ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)

# MinIO 설정

MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT") #실제 서버
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY")
MINIO_BUCKET_NAME = os.getenv("MINIO_BUCKET_NAME")

minio_client = Minio(
    MINIO_ENDPOINT,
    
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=False  # HTTPS를 사용하는 경우 True
)

# MinIO 버킷이 없으면 생성
if not minio_client.bucket_exists(MINIO_BUCKET_NAME):
    minio_client.make_bucket(MINIO_BUCKET_NAME)

# FastAPI 앱 생성
app = FastAPI()

# MediaPipe Pose 초기화
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

def calculate_knee_angle(landmarks):
    """무릎 각도를 계산하는 함수"""
    hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
    knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]
    ankle = landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value]

    vec1 = np.array([hip.x - knee.x, hip.y - knee.y])
    vec2 = np.array([ankle.x - knee.x, ankle.y - knee.y])

    angle = np.degrees(np.arccos(
        np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
    ))
    return angle

def analyze_pose(frame):
    """자세 분석 수행"""
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_frame)
    return results

def draw_pose_landmarks(frame, results):
    """자세 분석 결과를 프레임에 그리기"""
    if results.pose_landmarks:
        mp.solutions.drawing_utils.draw_landmarks(
            frame,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp.solutions.drawing_utils.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
            connection_drawing_spec=mp.solutions.drawing_utils.DrawingSpec(color=(0, 0, 255), thickness=2)
        )
        knee_angle = calculate_knee_angle(results.pose_landmarks.landmark)
        cv2.putText(frame, f"Knee Angle: {knee_angle:.2f} degrees", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
    return frame

import tempfile

@app.post("/api/analyze")
async def analyze_video(file: UploadFile = File(...)):
    """업로드된 영상을 분석하고 MinIO에 저장"""
    try:
        print(" 파일 업로드 시작")
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
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')

        # 3 분석된 영상 저장을 위한 임시 파일 생성
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_output_file:
            output_video_path = temp_output_file.name #3번

        out = cv2.VideoWriter(output_video_path , fourcc, fps, (width, height)) #4번
        
        print(f" Processed video file will be saved at: {output_video_path}")  # 로그 추가

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = analyze_pose(frame)
            annotated_frame = draw_pose_landmarks(frame, results)
            out.write(annotated_frame)

        cap.release()
        out.release()

        print(f" Processed video saved at: {output_video_path}")  # 로그 추가

        # 5. MinIO에 업로드
        # output_video.seek(0)
        analyzed_filename = f"pose_{file.filename}"
        minio_client.fput_object(
            MINIO_BUCKET_NAME, analyzed_filename, output_video_path, content_type="video/mp4"
        )

        # 6.영상 URL 반환
        video_url = f"http://{MINIO_ENDPOINT}/{MINIO_BUCKET_NAME}/{analyzed_filename}"
        print(f" Video uploaded to MinIO: {video_url}")  # 로그 추가

        return JSONResponse(content={"message": "운동 자세 분석 완료!", "video_url": video_url}, content_type="application/json")

        # 7️ 임시 파일 삭제 (메모리 관리)
        # os.remove(temp_video_path)
        # os.remove(output_video_path)
    except Exception as e:
        print(f" Error: {e}")  # 로그 추가
        import traceback
        traceback.print_exc()  # 상세 에러 출력
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/api/analyze/{filename}")
async def get_video_url(filename: str):
    """MinIO에서 분석된 영상의 URL 반환"""
    video_url = f"http://{MINIO_ENDPOINT}/{MINIO_BUCKET_NAME}/fastapi/analyze/{filename}"
    return JSONResponse(content={"video_url": video_url}, content_type="application/json")
    # return JSONResponse(content={"video_url": video_url})
