from django.db import models
from users.models import CenterOwner,Member,Instructor
from datetime import datetime
# Create your models here.

class Exercise(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="운동 이름")
    
    def __str__(self):
        return self.name

class Amenity(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="편의시설 이름")
    
    def __str__(self):
        return self.name

class Center(models.Model):
    name = models.CharField(max_length=255,verbose_name="센터 이름")
    #지도기능
    location = models.CharField(max_length=255, verbose_name="센터 위치")
    owner = models.ForeignKey(CenterOwner, on_delete=models.CASCADE, related_name='centers',verbose_name="센터장")
    image = models.ImageField(upload_to='center_images/', null=True, blank=True, verbose_name="센터 이미지")
    exercise = models.ManyToManyField(Exercise,verbose_name="운동 종목")
    amenity = models.ManyToManyField(Amenity,verbose_name="편의시설")

    def __str__(self):
        return f"{self.name} ({self.location})"

class InstructorApplication(models.Model):
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='center_requests')
    center = models.ForeignKey(Center, on_delete=models.CASCADE, related_name='center_requests')
    status = models.CharField(max_length=10,choices=[('pending', '대기 중'), ('approved', '승인됨'), ('rejected', '거절됨')],default='pending')
    requested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.instructor.user.name} → {self.center.name} ({self.status})"

class Membership(models.Model):
    center = models.ForeignKey(Center,on_delete=models.CASCADE,related_name='center_memberships',verbose_name="센터") 
    price = models.DecimalField(max_digits=10,decimal_places=0,verbose_name="가격(원)")
    duration = models.IntegerField(verbose_name="기간(일)")
    def __str__(self):
         return f"{self.center.name} - {self.price:,}원 ({self.duration}일)"

class MembershipOwner(models.Model):
    member = models.ForeignKey(Member,on_delete=models.CASCADE,related_name='membership_owners',verbose_name="수강생")
    center = models.ForeignKey(Center,on_delete=models.CASCADE,related_name='membership_owners',verbose_name="센터") 
    start_date = models.DateField(auto_now_add=True,  verbose_name="시작 날짜")
    end_date = models.DateField(verbose_name="종료 날짜")
    is_active = models.BooleanField(default=True,verbose_name="활성화 여부")
    def __str__(self):
         return f"회원:{self.member.user.name} - {self.center.name}"