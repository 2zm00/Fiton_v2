from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from lessons.models import Lesson
from users.models import Instructor  # 강사 모델 import 필요
from .serializers import ReviewSerializer
from django.db.models import Avg
from reservations.models import CompletedLesson

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # 로그인한 사용자만 가능
def review_list(request):
    if request.method == 'GET':  # 리뷰 목록 조회 (모든 사용자 가능)
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':  # 리뷰 작성
        user = request.user  #
        lesson_id = request.data.get('lesson')

        # 수업이 존재하는지 확인
        try:
            lesson = Lesson.objects.get(id=lesson_id)
        except Lesson.DoesNotExist:
            return Response({"error": "해당 수업을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        # 사용자가 해당 수업을 수강했는지 확인
        if not CompletedLesson.objects.filter(member= user.member , lesson_schedule = lesson.lesson_schedules ):
            return Response({"error": "이 수업을 수강한 적이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

        # 리뷰 생성
        data = request.data.copy()
        data['member'] = user.member.id
        serializer = ReviewSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            review = serializer.save(member=user.member, lesson=lesson)

            # 강사의 평균 평점 업데이트 로직 추가
            instructor = lesson.instructor  # 해당 수업의 강사
            reviews = Review.objects.filter(lesson__instructor=instructor)
            average_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
            instructor.average_rating = round(average_rating, 1)
            instructor.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])  # 로그인한 사용자만 가능
def review_detail(request, pk):
    try:
        review = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response({"error": "해당 리뷰를 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    # 로그인한 유저가 해당 리뷰 작성자인지 확인
    if review.member.user != request.user:
        return Response({"error": "이 리뷰를 수정하거나 삭제할 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

    instructor = review.lesson.instructor  # 해당 리뷰가 작성된 강사의 정보

    if request.method == 'GET':  # 특정 리뷰 조회
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    elif request.method == 'PUT':  # 특정 리뷰 수정
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # 리뷰 수정 시 강사의 평균 평점 업데이트
            reviews = Review.objects.filter(lesson__instructor=instructor)
            average_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
            instructor.average_rating = round(average_rating, 1)
            instructor.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':  # 특정 리뷰 삭제
        review.delete()

        #  리뷰 삭제 후 강사의 평균 평점 다시 계산
        reviews = Review.objects.filter(lesson__instructor=instructor)
        average_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        instructor.average_rating = round(average_rating, 1)
        instructor.save()

        return Response({"message": "리뷰가 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)

@app.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):
    try:
        # 임시 파일로 영상 저장
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            temp.write(await file.read())
            video_path = temp.name
        
        # 분석 결과 시각화
        output_path = "output.mp4"
        annotate_video(video_path, output_path)
        
        return JSONResponse(content={"result": "Video processed successfully", "output_path": output_path})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)