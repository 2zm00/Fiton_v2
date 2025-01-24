from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

#1.역할 구분(role) 2. 이름(name) 3.이미지(profile_img) 4.성별(gender) 5.생년월일(birth) 6.전화번호(phone_number) 7.아이디(username) 8.비번(password)

class FitonUser(AbstractUser):
    ROLE_CHOICES = (
        ('member', '수강생'),
        ('instructor', '강사'),
        ('centerowner', '센터장'),
    )
    name =models.CharField(max_length=20,verbose_name="이름")
    profile_image = models.ImageField(upload_to='profile_images/',null=True, blank=True, verbose_name="프로필 이미지")
    gender = models.CharField(max_length=6,choices=[('Male',"남자"),("Female","여자"),("None","비공개")], verbose_name ="성별")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES,  verbose_name="역할")
    birth= models.DateField(null=True,blank=True,verbose_name="생년월일")
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name="전화번호")   
    
    first_name = None 
    last_name = None 
    def __str__(self):
        return f"{self.username} ({self.role})"


class CenterOwner(models.Model):
    user = models.OneToOneField(FitonUser,on_delete= models.CASCADE , verbose_name="사용자 ")
    business_registration_number =models.CharField(max_length=10,verbose_name= "사업자 등록번호")

    def __str__(self):
        return f"{self.user.name} (센터장)" 


class Instructor(models.Model):
    user = models.OneToOneField(FitonUser,on_delete= models.CASCADE , verbose_name="사용자 ")

    center = models.ManyToManyField('centers.Center',related_name='instructors',verbose_name="등록 센터")
    specialties = models.CharField(max_length=255,verbose_name="전문 분야")
    years_of_experience = models.PositiveIntegerField(verbose_name='경력(년)',default=0)
    certifications = models.TextField(verbose_name='자격증',null=True,blank=True)
    rating = models.DecimalField(max_digits=2,decimal_places=1,default=0.0,verbose_name='평균 별점')
    bio = models.TextField(verbose_name='자기소개서',null=True,blank=True)




class Member(models.Model):
    user = models.OneToOneField(FitonUser,on_delete= models.CASCADE , verbose_name="사용자 ")
    lesson_history = models.ManyToManyField('lessons.Lesson',blank=True,related_name='attended_members',verbose_name="참여 수업 기록")
    def __str__(self):
        return f"{self.user.name} (회원)"



















