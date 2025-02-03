from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('centers/', views.center_list_create, name='center-list-create'),
    path('centers/<int:pk>/', views.center_detail_update_delete, name='center-detail-update-delete'),
]