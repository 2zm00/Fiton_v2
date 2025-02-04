from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from .models import Exercise, Amenity, Center, Membership, MembershipOwner,InstructorApplication
from users.models import Instructor
from .serializers import (
    CenterSerializer,
    MembershipSerializer,
    MembershipOwnerSerializer,
    InstructorApplicationSerializer
)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Center
from .serializers import CenterSerializer

@api_view(['GET', 'POST'])
def center_list_create(request):
    if request.method == 'GET':
        centers = Center.objects.prefetch_related('exercise', 'amenity').all()
        serializer = CenterSerializer(centers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CenterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user.centerowner)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def center_detail_update_delete(request, pk):
    try:
        center = Center.objects.prefetch_related('exercise', 'amenity').get(pk=pk)
    except Center.DoesNotExist:
        return Response({'error': '센터를 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CenterSerializer(center)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CenterSerializer(center, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        center.delete()
        return Response({'message': '센터 삭제 완료'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_center_join(request,pk):
    instructor = Instructor.objects.get(user=request.user)
    center = Center.objects.get(pk=pk)

    # 중복 신청 방지
    if InstructorApplication.objects.filter(instructor=instructor, center=center, status='pending').exists():
        return Response({'error': '이미 등록 신청을 했습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # 새 신청 생성
    center_request = InstructorApplication.objects.create(instructor=instructor, center=center, status='pending')

    return Response(
        {
            "message": "센터 등록 신청 완료",
            "request_id": center_request.id,
            "status": center_request.status
        },
        status=status.HTTP_201_CREATED
    )


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def membership(request,pk):
    if request.method == 'GET':
        memberships = Membership.objects.filter(center=pk)
        serializer = MembershipSerializer(memberships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        center=Center.objects.get(pk=pk)
    
        serializer = MembershipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(center=center)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','DELETE'])
def membership_detail(request, pk):
    membership = get_object_or_404(Membership, pk=pk)

    if request.method == 'GET':
        serializer = MembershipSerializer(membership)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        membership.delete()
        return Response({"message": "회원권이 성공적으로 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def instructor_application(request,pk):
    user=request.user
    instructor = Instructor.objects.get(user=user)
    center = Center.objects.get(pk=pk)
    serializer = InstructorApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(instructor=instructor,center=center)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
