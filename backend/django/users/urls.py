from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register('todos', views.TodoViewSet, basename='todo')

urlpatterns = [
    path('register/', views.register),
    path('role/', views.role_select),
    path('user_add_info/', views.user_detail),
    # path('', include(router.urls)),
]
