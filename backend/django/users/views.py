from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import FitonUserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from .serializers import CenterOwnerSerializer,MemberSerializer,InstructorSerializer
from django.shortcuts import get_object_or_404
from .models import FitonUser,Member,Instructor,CenterOwner
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = FitonUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def role_select(request):
    
    user = request.user
    role = request.data.get('role')

    if not role:
        return Response({"error": "역할이 필요합니다"}, status=status.HTTP_400_BAD_REQUEST)
    if role not in ['member', 'instructor', 'centerowner']:
        return Response({"error": "유효하지 않은 역할입니다."}, status=status.HTTP_400_BAD_REQUEST)

    user.role = role
    user.save()

    return Response({"message": "역할이 성공적으로 변경되었습니다.", "role": user.role})

@api_view(['GET', 'POST', 'PATCH'])
@permission_classes([IsAuthenticated])
def user_add_info(request):
    user = request.user
    is_partial = request.method == 'PATCH'
    if request.method == 'GET':
        user_info_serializer = FitonUserSerializer(user)
        if user.role == 'centerowner':
            role_serializer = CenterOwnerSerializer(CenterOwner.objects.get(user=user))
        elif user.role == 'instructor':
            role_serializer = InstructorSerializer(Instructor.objects.get(user=user))
        elif user.role == 'member':
            role_serializer = MemberSerializer(Member.objects.get(user=user))
        else:
            return Response({"error": "유효하지 않은 역할이거나 역할이 설정되지 않았습니다."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "user_data": user_info_serializer.data,
            "role_data": role_serializer.data
        })
    user_info_serializer = FitonUserSerializer(user, data=request.data, partial=is_partial)
    if user_info_serializer.is_valid():
        user_info_serializer.save()
    else:
        return Response(user_info_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if user.role == 'centerowner':
        role_instance = get_object_or_404(CenterOwner, user=user) if request.method == 'PATCH' else None
        role_serializer = CenterOwnerSerializer(instance=role_instance, data=request.data, partial=is_partial)
    elif user.role == 'instructor':
        role_instance = get_object_or_404(Instructor, user=user) if request.method == 'PATCH' else None
        role_serializer = InstructorSerializer(instance=role_instance, data=request.data, partial=is_partial)
    elif user.role == 'member':
        role_instance = get_object_or_404(Member, user=user) if request.method == 'PATCH' else None
        role_serializer = MemberSerializer(instance=role_instance, data=request.data, partial=is_partial)
    else:
        return Response({"error": "유효하지 않은 역할이거나 역할이 설정되지 않았습니다."}, status=status.HTTP_400_BAD_REQUEST)

    if role_serializer.is_valid():
        if request.method == 'POST':
            role_serializer.save(user=user)
        else:
            role_serializer.save()

        return Response({
            "message": "사용자 정보 및 역할 정보가 성공적으로 업데이트되었습니다.",
            "user_data": user_info_serializer.data,
            "role_data": role_serializer.data
        })

    return Response(role_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
   
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete(request):
    user=request.user
    user.delete()
    return Response({"message": "사용자 계정이 성공적으로 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    # user = request.user
    # user_info_serializer = FitonUserSerializer(user,data=request.data,partial=True)
    # if user_info_serializer.is_valid():
    #     user_info_serializer.save()
    # else:
    #     return Response(user_info_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # if user.role == 'centerowner':
    #     role_serializer = CenterOwnerSerializer(data=request.data)
    # elif user.role == 'instructor':
    #     role_serializer = InstructorSerializer(data=request.data)
    # elif user.role == 'member':
    #     role_serializer = MemberSerializer(data=request.data)
    # else:
    #     return Response({"error": "Invalid role or role not set."}, status=status.HTTP_400_BAD_REQUEST)

    # if role_serializer.is_valid():
    #     role_serializer.save(user_id=user.id)
    #     return Response({"message": "Role details saved successfully."})
    # return Response(role_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
