from django.urls import path
from .views import review_list, review_detail

urlpatterns = [
    path('reviews/', review_list, name='review-list'),  # 모든 리뷰 조회 및 작성
    path('reviews/<int:pk>/', review_detail, name='review-detail'),  # 특정 리뷰 조회, 수정, 삭제
]
