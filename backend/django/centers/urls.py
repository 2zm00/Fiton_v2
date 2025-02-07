from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    # centerowner
    path('center/', views.center_list_create, name='center-list-create'),
    path('center/detail/', views.center_detail_update_delete, name='center-detail-update-delete'),
    path('center/membership/',views.membership ,name='membership'   ),
    path('center/membership/detail/',views.membership_detail,name='membership_detail'),
    path('center/instructor/application/list/',views.instructor_application_list,name='instructor_application_list'),
    path('center/instructor/application/update/',views.instructor_application_update,name='instructor_application_update'   ),
    # instructor
    path('instructor/center/list/',views.instructor_center_list,name='instructor_center_list'),
    path('instructor/center/application/',views.instructor_application,name='instructor_application'),
]