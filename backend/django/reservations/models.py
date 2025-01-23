from django.db import models
from lessons.models import Lesson_schedule
from users.models import User
from django.utils import timezone
# Create your models here.
class Reservation(models.Model):
    STATUS_CHOICES = [
        ('confirmed', '예약 확정'),
        ('waiting', '예약 대기'),
        ('canceled', '예약 취소'),
    ]
    lesson_schedule = models.ForeignKey(Lesson_schedule, on_delete=models.CASCADE, related_name='reservations')
    member = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'member'})
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='confirmed')
    reserved_at = models.DateTimeField(auto_now_add=True)
    cancel_at = models.DateTimeField(null=True,blank=True)
    #멤버는 한 수업스케줄에 한 번만 예약 가능
    class Meta:
        unique_together = ('lesson_schedule', 'member')

    def __str__(self):
        return f"{self.member.name} 예약 : {self.lesson_schedule.lesson.name} ({self.status})"
    #취소 가능 여부 확인
    def can_cancel(self):
        return timezone.now() < self.lesson_schedule.cancellation_permission

class Attendance(models.Model):
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE, related_name='attendance')
    ATTENDANCE_CHOICES = [
        ('attended', '참석'),
        ('no-show', '미 참석'),
    ]
    status = models.CharField(max_length=10, choices=ATTENDANCE_CHOICES, default='no-show')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Attendance for {self.reservation.member.username}: {self.status}"
    def can_review(self):
        return self.status == 'attended' and timezone.now() > self.reservation.lesson_schedule.lesson.review_permission

