from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('center/', views.center_list_create, name='center-list-create'),
    path('center/<int:pk>/', views.center_detail_update_delete, name='center-detail-update-delete'),
    path('center/<int:pk>/membership/',views.membership),
    path('center/membership/detail/<int:pk>/',views.membership_detail)
]