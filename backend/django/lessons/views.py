from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from users.models import Instructor,FitonUser 
from centers.models import Center
from lessons.models import Lesson,Lesson_schedule 
from .serializers import LessonSerializer,LessonScheduleSerializer
# Create your views here.
@api_view(['POST'])
def lesson_create(request):
    user=request.user
    try:
        center_id=request.data.get('center_id')
        center=Center.objects.get(id=center_id)
    except Center.DoesNotExist:
        return Response({"error":"센터가 존재하지 않습니다."},status=status.HTTP_404_NOT_FOUND)
    lesson_serializer=LessonSerializer(data=request.data)
    if lesson_serializer.is_valid():
        lesson_serializer.save(instructor=user.instructor,center=center)
        return Response(lesson_serializer.data, status=status.HTTP_201_CREATED)
    return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def lesson_detail(request,lesson_id):
    lesson=Lesson.objects.get(id=lesson_id)
    if request.method=='GET':
        lesson_serializer=LessonSerializer(lesson)
        return Response(lesson_serializer.data,status=status.HTTP_200_OK)
    elif request.method=='PUT':
        lesson_serializer=LessonSerializer(lesson,data=request.data)
        if lesson_serializer.is_valid():
            lesson_serializer.save()
            return Response(lesson_serializer.data,status=status.HTTP_200_OK)
        return Response(lesson_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        lesson.delete()
        return Response({"message":"수업이 삭제되었습니다."},status=status.HTTP_200_OK)

@api_view(['GET'])
def instructor_lesson_list(request):
    instructor_id= request.GET.get('instructor_id')
    if instructor_id:
        pass
    else:
        return Response({"error":"강사가 존재하지 않습니다."},status=status.HTTP_400_BAD_REQUEST) 
    instructor=Instructor.objects.get(id=instructor_id)
    lesson_list=Lesson.objects.filter(instructor=instructor)
    lesson_serializer=LessonSerializer(lesson_list,many=True)
    return Response(lesson_serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def lesson_schedule_create(request):
    try:
        lesson_id=request.data.get('lesson_id')
        lesson=Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        return Response({"error":"수업이 존재하지 않습니다."},status=status.HTTP_404_NOT_FOUND)
    schedules_data = request.data.get('schedules')
    if not schedules_data:
        return Response({"error":"스케쥴 데이터가 없습니다."},status=status.HTTP_400_BAD_REQUEST)
    schedules = []
    for schedule_data in schedules_data:
        lesson_schedule_serializer=LessonScheduleSerializer(data=schedule_data)
        if lesson_schedule_serializer.is_valid():
            lesson_schedule_serializer.save(lesson=lesson)
            schedules.append(lesson_schedule_serializer.data)
        else:
            return Response(lesson_schedule_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(schedules,status=status.HTTP_201_CREATED)

@api_view(['GET'])
def lesson_schedule_list(request):
    lesson_id=request.GET.get('lesson_id')
    lesson=Lesson.objects.get(id=lesson_id)
    lesson_schedule_list=Lesson_schedule.objects.filter(lesson=lesson)
    lesson_schedule_serializer=LessonScheduleSerializer(lesson_schedule_list,many=True)
    return Response(lesson_schedule_serializer.data,status=status.HTTP_200_OK)

@api_view(['GET','PUT','DELETE'])
def lesson_schedule_detail(request):
    lesson_schedule=Lesson_schedule.objects.get(id=request.data.get('lesson_schedule_id'))
    if request.method=='GET':
        lesson_schedule_serializer=LessonScheduleSerializer(lesson_schedule)
        return Response(lesson_schedule_serializer.data,status=status.HTTP_200_OK)  
    elif request.method=='PUT':
        lesson_schedule_serializer=LessonScheduleSerializer(lesson_schedule,data=request.data)
        if lesson_schedule_serializer.is_valid():
            lesson_schedule_serializer.save()
            return Response(lesson_schedule_serializer.data,status=status.HTTP_200_OK)
        return Response(lesson_schedule_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        lesson_schedule.delete()
        return Response({"message":"수업 스케쥴이 삭제되었습니다."},status=status.HTTP_200_OK)



