from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register('todos', views.TodoViewSet, basename='todo')

urlpatterns = [
    path('register/', views.register),
    path('user/role/', views.role_select),
    path('user/info/', views.user_add_info),
    path('user/delete/', views.user_delete),
    
]
