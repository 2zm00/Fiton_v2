from django.core.management.base import BaseCommand
from datetime import date
from centers.models import Membership  # Membership 모델 import

class Command(BaseCommand):
    help = "Deactivate memberships with expired end dates"

    def handle(self, *args, **kwargs):
        today = date.today()
        # 종료 날짜가 지난 활성 상태 멤버십 비활성화
        expired_memberships = Membership.objects.filter(end_date__lt=today, is_active=True)
        count = expired_memberships.update(is_active=False)

        self.stdout.write(f"{count} expired memberships have been deactivated.")
