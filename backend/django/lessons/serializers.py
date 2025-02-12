from rest_framework import serializers
from .models import Lesson,Lesson_schedule,LessonTicket,LessonTicketOwner


class LessonSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Lesson
        fields = ['name', 'exercise', 'content', 'location', 'duration']

class LessonScheduleSerializer(serializers.ModelSerializer):
    reservation_permission = serializers.DateTimeField(required=False)
    cancellation_permission = serializers.DateTimeField(required=False)
    class Meta:
        model=Lesson_schedule
        fields=['id','start_lesson','reservation_permission','cancellation_permission','max_member']


    
    
