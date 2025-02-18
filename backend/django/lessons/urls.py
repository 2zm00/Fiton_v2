from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('lesson/',views.lesson_create),
    path('lesson/schedule/',views.lesson_schedule_create),
]