from django.db import models
from users.models import FitonUser
# Create your models here.
class Notification(models.Model):
    user = models.ForeignKey(FitonUser, on_delete=models.CASCADE, related_name='notifications',verbose_name="사용자")
    message = models.TextField(verbose_name="알림 메시지")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성일")
    is_read = models.BooleanField(default=False, verbose_name="읽음 여부")

    def __str__(self):
        return f"알림: {self.message[:30]}... ({'읽음' if self.is_read else '읽지 않음'})"
