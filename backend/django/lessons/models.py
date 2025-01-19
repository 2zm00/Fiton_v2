from django.db import models
from django.contrib.auth.models import AbstractUser
from users.models import Instructor ,Member
from centers.models import Center,Exercise

# 수업 모델 
class Lesson(models.Model):
    name = models.CharField(max_length=255, verbose_name="제목")
    center = models.ForeignKey(Center, on_delete=models.CASCADE, related_name='lessons',verbose_name="진행 센터")
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='lessons',verbose_name="강사")
    exercise = models.ForeignKey(Exercise,on_delete=models.CASCADE, verbose_name="운동 종목",related_name='lessons')
    content = models.TextField(null=True, blank=True,  verbose_name="수업 내용")
    location = models.TextField(max_length=255,verbose_name="수업 장소")
    duration = models.PositiveIntegerField(default=60, verbose_name="진행 시간(분)")
    def __str__(self):
        return f"{self.name} ({self.center.exercise.name})"

class Lesson_schedule(models.Model):
    lesson= models.ForeignKey(Lesson , on_delete=models.CASCADE, related_name='lesson_schedules',verbose_name="수업 내용")
    start_lesson = models.DateTimeField(verbose_name="수업 진행 일시")
    reservation_permission = models.DateTimeField(verbose_name="예약 가능 시간", null=True, blank=True)
    cancellation_permission = models.DateTimeField(verbose_name="예약 취소 날짜", null=True,blank=True)
    max_member = models.IntegerField(verbose_name="최대 인원")
    def __str__(self):
        return f"{self.lesson.name} ({self.start_lesson.strftime('%Y년 %m월 %d일 %H시 %M분')})"
        


class LessonTicket(models.Model):
    lesson= models.ForeignKey(Lesson , on_delete=models.CASCADE, related_name='lesson_ticket',verbose_name="수업권 가격")
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="가격(원)")
    def __str__(self):
        return f"{self.lesson.name} ({self.price}원)"

class LessonTicketOwner(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='lesson_ticket_owner',verbose_name="수강생")
    Lesson_ticket = models.ForeignKey(LessonTicket,  on_delete=models.CASCADE,   related_name='lesson_ticket_owner',verbose_name="수업권")
    quantity=models.PositiveIntegerField(default=0,verbose_name="수업권 개수")
    used_count = models.PositiveIntegerField(default=0,verbose_name="사용한 수업권 횟수") 
    def __str__(self):
        return f"수강생 {self.member.name}, 수업: {self.Lesson_ticket.lesson.name}"