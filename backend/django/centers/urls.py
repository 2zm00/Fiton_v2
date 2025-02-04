from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('center/', views.center_list_create, name='center-list-create'),
    path('center/<int:pk>/', views.center_detail_update_delete, name='center-detail-update-delete'),
    path('center/<int:pk>/membership/',views.membership),
    path('center/membership/detail/<int:pk>/',views.membership_detail),
    path('center/<int:pk>/instructor/application/',views.instructor_application),
    path('center/<int:pk>/instructor/application/list/',views.instructor_application_list),
    path('center/instructor/application/<int:pk>/',views.instructor_application_update)
]