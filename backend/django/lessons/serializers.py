from rest_framework import serializers
from .models import Lesson,Lesson_schedule,LessonTicket,LessonTicketOwner


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model=Lesson
        field=['id','name','exercise','content','location','duration']

class LessonScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Lesson_schedule
        field=['id','start_lesson','reservation_permission','cancellation_permission','max_member']

