# Python 최신 버전 사용
FROM python:3.10

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 패키지 설치 (OpenCV 실행을 위한 GUI 라이브러리 추가)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0

# pip 최신 버전 업데이트
RUN pip install --upgrade pip

# 종속성 설치
COPY requirements.txt .
RUN pip install -r requirements.txt

# 애플리케이션 복사
COPY . .

# FastAPI 실행
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
