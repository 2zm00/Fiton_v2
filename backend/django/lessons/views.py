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
    center_name=request.data.get('center')
    center=Center.objects.get(name=center_name)
    lesson_serializer=LessonSerializer(data=request.data)
    if lesson_serializer.is_valid():
        lesson_serializer.save(instructor=user.instructor,center=center)
        return Response(lesson_serializer.data, status=status.HTTP_201_CREATED)
    return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def instructor_lesson_list(request):
    instructor_name= request.GET.get('instructor')
    if instructor_name:
        pass
    else:
        return Response({"error":"강사이름을 입력해주세요"},status=status.HTTP_400_BAD_REQUEST) 
    user=FitonUser.objects.get(name=instructor_name)
    instructor=Instructor.objects.get(user=user)
    lesson_list=Lesson.objects.filter(instructor=instructor)
    lesson_serializer=LessonSerializer(lesson_list,many=True)
    return Response(lesson_serializer.data,status=status.HTTP_200_OK)

    

