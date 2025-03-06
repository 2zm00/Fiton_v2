# Fiton_v2 프로젝트

<div align=center>

![fiton로고](https://github.com/user-attachments/assets/82e0c392-93ca-485f-9b9d-e80c3e58ec0c)


</div>




## [📋 프로젝트 개요](pplx://action/followup)

헬스 및 피트니스 산업은 건강 인식 증대와 만성질환 예방 수요 증가, 여성 전용 서비스 확대 등으로 급속히 성장하고 있습니다.  
2024년 약 **5조 7천억 원**에서 연평균 **9.96% 성장률**로 2029년 약 **9조 2천억 원** 규모에 이를 것으로 예상됩니다.  
그러나 기존 피트니스 센터 관리 시스템은 다음과 같은 문제를 드러내고 있습니다:

- **[수강생](pplx://action/followup)**: 번거로운 스케줄 조정(33% 시간 소요), 체계적 기록 확인 불가
- **[강사](pplx://action/followup)**: 업무 부담 가중(주당 15시간 소모), 노쇼 처리의 복잡성
- **[센터 운영](pplx://action/followup)**: 정보 관리 누락 위험(연간 12% 오류율), 수업료 정산 오류(월 평균 7건 분쟁)

<div align=center>

![Fiton 시연 gif](https://github.com/user-attachments/assets/5cb0bd5f-4355-474a-aa42-fe2e425efe77)

</div>

**해당 프로젝트는 [2차 프로젝트 Fiton](https://github.com/2zm00/Fiton_Project)를 기반으로 하여 기존의 기능과 구조를 개선하고, 새로운 기술과 요구사항을 반영한 형태로 진행되었습니다.**

---

## [🎯 프로젝트 목표](pplx://action/followup)

### [🗂️ 프로젝트 기획 및 문서화](pplx://action/followup)
- WBS를 통한 체계적 일정 관리 및 작업 분배
- ERD 설계를 통한 데이터베이스 구조 최적화
- 상세 Workflow 및 사용자 화면 Flowchart 작성
- 명확한 기능명세서와 API 연동 정의서 작성

### [🛠️ 개발 프로세스 관리](pplx://action/followup)
- Git 커밋 컨벤션 확립으로 코드 이력 관리 표준화
- Github Projects와 Milestone을 활용한 진행 상황 추적
- Github Actions를 통한 자동화된 코드 리뷰 구현
- 정기적인 팀 미팅으로 진행 상황 공유 및 이슈 해결

### [⚙️ 기술적 목표](pplx://action/followup)
- MSA 아키텍처 구현 (프론트엔드/백엔드/DB/스토리지 서버 분리)
- 서비스 간 독립적 확장성 확보 및 효율적 통신 구조 설계

### [🚀 DevOps 환경 구축](pplx://action/followup)
- AWS EC2, Oracle Cloud 기반 인프라 구성
- MinIO, S3를 활용한 확장 가능한 스토리지 시스템 구축
- Docker 컨테이너화 및 nginx 서버 구성
- CI/CD 파이프라인 자동화

### [🤖 AI 서비스 통합](pplx://action/followup)
- Langchain, HuggingFace 기반 AI 챗봇 구현
- Google Mediapipe를 활용한 실시간 운동 자세 분석 기능 도입
- RESTful API 기반 프론트엔드와 백엔드 통신 구조 설계

---

## [👥 팀 구성 및 역할](pplx://action/followup)

### [@2zm00 (프로젝트 매니저 팀장, 프론트엔드 리더)](pplx://action/followup)
#### [주요 역할:](pplx://action/followup)
- 프로젝트 매니저 팀장, 프론트엔드 리더, 기획, 문서화, 일정관리 및 계획 수립, DevOps Storage 환경 구축  
#### [기술 구현:](pplx://action/followup)
1. **[프론트엔드](pplx://action/followup)**
   - Next.js 기반 개발 환경 구축, 반응형 UI/UX 설계
   - REST API 연동 및 상태 관리 시스템 구현
   - SEO 최적화 및 성능 개선
2. **[인프라 구축](pplx://action/followup)**
   - Docker Compose와 nginx를 활용한 마이크로서비스 아키텍처 구현
   - S3, MinIO를 활용한 확장 가능한 스토리지 인프라 구축
   - AWS EC2, Oracle Cloud 인스턴스 운영 및 관리
3. **[DevOps 환경 구축](pplx://action/followup)**
   - Github Actions를 활용한 CI/CD 파이프라인 구현
   - Docker 컨테이너 기반 배포 자동화
   - MSA 아키텍처 설계 및 구현 (프론트엔드/백엔드/DB/스토리지 분리)
   - 마이크로서비스 간 통신 구조 최적화
4. **[AI 기능 구현](pplx://action/followup)**
   - Langchain과 HuggingFace 기반 AI 챗봇 서비스 개발
   - Google Mediapipe 기반 운동 자세 분석 기능

### [@mungwangwoo (백엔드 리더)](pplx://action/followup)
#### [주요 역할:](pplx://action/followup)
- 백엔드 아키텍처 설계, DB 서버 구축, Langchain AI 챗봇 구축, 모킹 데이터 Faker , API 엔드포인트 구현, 백엔드 아키텍쳐 구현, API 기능명세서  
#### [기술 구현:](pplx://action/followup)
1. **[백엔드](pplx://action/followup)**
   - Django와 FastAPI 기반 백엔드 개발 환경 구축
   - API 엔드포인트 설계 및 모킹 데이터 생성 (Faker 활용)
2. **[인프라 구축](pplx://action/followup)**
 - Docker Compose를 활용한 컨테이너 기반 마이크로서비스 아키텍처 구현
 - AWS EC2 ,Oracle Cloud 인스턴스 운영 및 관리
3. **[DevOps 환경 구축](pplx://action/followup)**
   - Docker 컨테이너 기반 배포 자동화
4. **[AI 기능 구현](pplx://action/followup)**
   - Langchain과 HuggingFace 기반 AI 챗봇 서비스 개발

### [@betkim (AI 운동 자세 분석 담당)](pplx://action/followup)
#### [주요 역할:](pplx://action/followup)
- Google Mediapipe를 활용한 AI 운동 자세 분석 기능 도입  
#### [기술 구현:](pplx://action/followup)
1. Django Rest Framework 기반 API 구축
2. FastAPI를 활용한 운동 자세 분석 기능 개발

---

## [🛠️ 기술 스택](pplx://action/followup)

| 영역         | 기술 스택                                                                 |
|--------------|--------------------------------------------------------------------------|
| **[백엔드](pplx://action/followup)**    | Python, Django Rest Framework, FastAPI                                   |
| **데이터베이스** | PostgreSQL, MySQL                                                        |
| **[프론트엔드](pplx://action/followup)**| Next.js, React, Tailwind CSS                                             |
| **인프라**       | AWS S3, MinIO, Oracle Cloud                                              |
| **CI/CD**        | Github Actions, Docker Compose                                          |
| **웹 서버**      | nginx                                                                   |
| **AI/ML**        | Langchain, HuggingFace, Google Mediapipe                                |

---

## [📅 프로젝트 일정](pplx://action/followup)
- 기간: 2025년 1월 22일 ~ 2025년 2월 19일  

---

## [📂 결과물 목록](pplx://action/followup)

1. 메인 동영상 배너 영상  
2. 추가정보 입력 화면 사진  
3. AI 챗봇 도입 화면 사진  
4. 자세 분석 도입 화면 사진  

---

## [📜 문서 목록](pplx://action/followup)

1. 흐름도 (Flowchart)  
2. 작업 분류 구조 (WBS)  
3. 커밋 컨벤션 문서  
4. 기능 명세서  
5. Milestone 계획표  
6. MinIO 스토리지 구성 문서  
7. Docker/nginx 설정 문서  
8. LLM 코드 리뷰 결과물

   
![시스템 아키텍쳐](https://github.com/user-attachments/assets/8e7dcabe-246f-4dcf-9bcc-34b712979917)

---

## [🔗 레포지토리 링크  ](pplx://action/followup)
[FitOn_v2 GitHub Repository](https://github.com/2zm00/Fiton_v2)
