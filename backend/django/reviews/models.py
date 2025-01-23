from django.db import models
from users.models import Member
from lessons.models import Lesson

# Create your models here.
# 리뷰 모델
class Review(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='reviews', verbose_name="수강생")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='reviews',verbose_name="수업")
    rating = models.IntegerField(verbose_name="평점")
    comment = models.TextField(verbose_name="리뷰 내용")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="작성 시간")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정 시간")

    def __str__(self):
        return f"{self.member.user.name} - {self.lesson.name} ({self.rating})"
            

