from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
# from .models import 
from .serializers import LessonSerializer,LessonScheduleSerializer
# Create your views here.
@api_view(['POST'])
def lesson_create(request):
    user=request.user
    lesson_serializer=LessonSerializer(data=request.date)
    if lesson_serializer.is_valid():
        lesson_serializer.save(instructor=user.instructor)
        return Response(lesson_serializer.data, status=status.HTTP_201_CREATED)
    return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
