from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import FitonUserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from .serializers import CenterOwnerSerializer,MemberSerializer,InstructorSerializer,UserAdditionalInfoSerializer

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
        return Response({"error": "Role is required."}, status=status.HTTP_400_BAD_REQUEST)
    if role not in ['member', 'instructor', 'centerowner']:
        return Response({"error": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)

    user.role = role
    user.save()

    return Response({"message": "Role updated successfully.", "role": user.role})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    
    user = request.user
    user_info_serializer = UserAdditionalInfoSerializer(user,data=request.data)
    if user_info_serializer.is_valid():
        user_info_serializer.save(user=user)
    else:
        return Response(user_info_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if user.role == 'centerowner':
        role_serializer = CenterOwnerSerializer(data=request.data)
    elif user.role == 'instructor':
        role_serializer = InstructorSerializer(data=request.data)
    elif user.role == 'member':
        role_serializer = MemberSerializer(data=request.data)
    else:
        return Response({"error": "Invalid role or role not set."}, status=status.HTTP_400_BAD_REQUEST)

    if role_serializer.is_valid():
        role_serializer.save(user=user)
        return Response({"message": "Role details saved successfully."})
    return Response(role_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
