from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

#1.역할 구분(role) 2. 이름(name) 3.이미지(profile_img) 4.성별(gender) 5.생년월일(birth) 6.전화번호(phone_number) 7.아이디(username) 8.비번(password)

class User(AbstractUser):
    name =models.CharField(max_length=20,verbose_name="역할")
    profile_image = models.ImageField(upload_to='profile_images/',null=True, blank=True, verbose_name="프로필 이미지")
    gender = models.CharField(max_length=5,choices=[('M',"남자"),("F","여자"),("N","비공개")], verbose_name ="성별")
    birth= models.DateField(null=True,blank=True,verbose_name="생년월일")
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name="전화번호")   



class CenterOwner(models.Model):
    user = models.OneToOneField(User,on_delete= models.CASCADE , verbose_name="사용자 ")
    business_registration_number =models.CharField(max_length=10,verbose_name= "사업자 등록번호")

    def __str__(self):
        return f"{self.user.name} (센터장)" 


class Instructor(models.Model):
    user = models.OneToOneField(User,on_delete= models.CASCADE , verbose_name="사용자 ")

    center = models.ManyToManyField(Center,related_name='instructors',verbose_name="등록 센터")
    specialties = models.CharField(max_length=255,verbose_name="전문 분야")
    years_of_experience = models.PositiveIntegerField(verbose_name='경력(년)',default=0)
    certifications = models.TextField(verbose_name='자격증',null=True,blank=True)
    rating = models.DecimalField(max_digits=2,decimal_places=1,default=0.0,verbose_name='평균 별점')
    bio = models.TextField(verbose_name='자기소개서',null=True,blank=True)




class Member(models.Model):
    user = models.OneToOneField(User,on_delete= models.CASCADE , verbose_name="사용자 ")
    def __str__(self):
        return f"{self.user.name} (회원)"



















