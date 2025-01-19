from django.db import models
from django.contrib.auth.models import AbstractUser
from users.models import *
# from centers.models import *
from datetime import timedelta,date,datetime
# from users import . 

# 운동 종목 모델
class Exercise(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        verbose_name="운동 종목"
    )

    def __str__(self):
        return self.name
    
# 수업 종류 모델
class Class_type(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name="수업 종류"
    )

    def __str__(self):
        return self
    
# 수업 모델
class Class(models.Model):
    name = models.CharField(
        max_length=255, 
        verbose_name="제목"
    )
    center = models.ForeignKey(
        Center, 
        on_delete=models.CASCADE, 
        related_name='classes',
        verbose_name="진행 센터"
    )
    instructor = models.ForeignKey(
        Instructor, 
        on_delete=models.CASCADE, 
        related_name='classes',
        verbose_name="강사"
    )
    #수업종류는 center.exercise.name
    exercise = models.ForeignKey(
        Exercise,
        on_delete=models.CASCADE, 
        verbose_name="운동 종목",
        related_name='classes',
        default=1

    )
    # 수업종류는 1:1/ 1:다 및 수업권 구분할 수 있는 정보가 필요함.
    class_type=models.ForeignKey(
        Class_type,
        on_delete=models.CASCADE, 
        related_name='classes',
        verbose_name="수업 종류"
    )

    content = models.TextField(
        null=True, 
        blank=True,  
        verbose_name="수업 내용"
    )

    location = models.TextField(
        max_length=255,
        verbose_name="수업 장소"
    )
    #알림 로직 시 필요할 것 (예정)
    start_class = models.DateTimeField(
        verbose_name="수업 진행 일시"
    )
    reservation_permission = models.DateTimeField(
        verbose_name="예약 가능 시간",
        null=True,  
        blank=True
    )
    cancellation_permission = models.DateTimeField(
        verbose_name="예약 취소 날짜",
        null=True, 
        blank=True
    )

    max_member = models.IntegerField(
        verbose_name="최대 인원"
    )
    min_memeber = models.IntegerField(
        verbose_name="최소 인원"
    )

    is_deleted = models.BooleanField(
        default=False,
        verbose_name="삭제 여부"
    )
    

    def __str__(self):
        return f"{self.name} ({self.center.exercise.name})"
    
    def save(self, *args, **kwargs):
        # start_class가 설정된 경우에만 기본값 설정
        if self.start_class:
            if not self.reservation_permission:
                self.reservation_permission = self.start_class - timedelta(days=2)
            if not self.cancellation_permission:
                self.cancellation_permission = self.start_class - timedelta(days=1)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # 실제 삭제 대신 is_deleted를 True로 설정
        self.is_deleted = True
        self.save()
 

class ClassTicket(models.Model):
    class_type = models.ForeignKey(
        Class_type, 
        on_delete=models.CASCADE, 
        related_name='class_ticket',
        verbose_name="수업 종류"
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="가격"
    )
    ticket_quantity = models.PositiveIntegerField(
        default=1,
        verbose_name="수업권 횟수"
    ) 


class ClassTicketOwner(models.Model):
    member = models.ForeignKey(
        Member, 
        on_delete=models.CASCADE, 
        related_name='class_ticket_owner',
        verbose_name="수강생"
    )
    class_ticket = models.ForeignKey(
        ClassTicket, 
        on_delete=models.CASCADE, 
        related_name='class_ticket_owner',
        verbose_name="수업권"
    )
    quantity=models.PositiveIntegerField(
        default=0,
        verbose_name="수업권 개수"
    )
    used_count = models.PositiveIntegerField(
        default=0,
        verbose_name="사용한 수업권 횟수"
    ) 