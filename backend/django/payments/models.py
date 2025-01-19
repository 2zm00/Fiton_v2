 # payments/models.py
from django.db import models
from django.conf import settings
from users.models import Member

class Payment(models.Model):
    STATUS_CHOICES = (
        ('READY', '결제준비'),
        ('IN_PROGRESS', '결제중'),
        ('DONE', '결제완료'),
        ('CANCELED', '결제취소'),
        ('FAILED', '결제실패')
    )
    ITEM_TYPES = (
        ('membership', '회원권'),
        ('lessonticket', '수업권'),
    )
    order_id = models.CharField(max_length=64, unique=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default='READY')
    payment_key = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    item_type = models.CharField(max_length=20, choices=ITEM_TYPES)
    item_id = models.IntegerField(default=0) 
