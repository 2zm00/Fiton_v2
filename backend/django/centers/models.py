from django.db import models
from users.models import CenterOwner

# Create your models here.

class Exercise(models.Model):
    name = models.CharField(max_length=100, verbose_name="운동 이름")
    
    def __str__(self):
        return self.name

class Amenity(models.Model):
    name = models.CharField(max_length=100, verbose_name="편의시설 이름")
    
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