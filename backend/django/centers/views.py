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

# 센터장 센터 상세 조회, 수정, 삭제
@api_view(['GET', 'PUT', 'DELETE'])
def center_detail_update_delete(request):
    try:
        center = Center.objects.prefetch_related('exercise', 'amenity').get(pk=request.data.get('center_id'))
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

# 센터장 회원권 목록 조회, 생성
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def membership(request):
    if request.method == 'GET':
        memberships = Membership.objects.filter(center=request.data.get('center_id'))
        serializer = MembershipSerializer(memberships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        center=Center.objects.get(pk=request.data.get('center_id'))
    
        serializer = MembershipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(center=center)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 센터장 회원권 상세 조회, 삭제
@api_view(['GET','DELETE'])
def membership_detail(request, pk):
    membership = get_object_or_404(Membership, pk=pk)

    if request.method == 'GET':
        serializer = MembershipSerializer(membership)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        membership.delete()
        return Response({"message": "회원권이 성공적으로 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)

# 강사 센터 신청 및 신청 취소
@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])
def instructor_application(request):
    instructor = get_object_or_404(Instructor, user=request.user)
    center = get_object_or_404(Center, id=request.data.get('center_id'))

    if request.method == 'POST':
        instructor_application, created = InstructorApplication.objects.get_or_create(
            instructor=instructor, center=center,
            defaults={'status': 'pending'}
        )

        serializer = InstructorApplicationSerializer(instructor_application)
        if created:
            return Response({"message": "신청이 완료되었습니다.", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"message": "이미 신청된 내역이 있습니다.", "data": serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        instructor_application = InstructorApplication.objects.filter(instructor=instructor, center=center,status='pending').first()

        if instructor_application:
            instructor_application.delete()
            return Response({"message": "등록 신청이 취소되었습니다."}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({"message": "신청 내역이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

# 센터장 강사 신청 목록 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def instructor_application_list(request):
    center = Center.objects.get(pk=request.data.get('center_id'))
    instructor_application = InstructorApplication.objects.filter(center=center)

    serializer = InstructorApplicationSerializer(instructor_application, many=True)
    return Response(serializer.data)

# 센터장 강사 신청 상태 변경
@api_view(['PATCH'])
@permission_classes([IsAuthenticated]) 
def instructor_application_update(request):
    instructor_application = get_object_or_404(InstructorApplication, pk=request.data.get('instructor_application_id'))

    application_status = request.data.get("status")

    if application_status not in ["approved", "rejected"]:
        return Response({"error": "유효하지 않은 상태 값입니다."}, status=status.HTTP_400_BAD_REQUEST)

    if application_status == "approved":
        instructor = instructor_application.instructor
        if instructor_application.center not in instructor.center.all():
            instructor.center.add(instructor_application.center)
            instructor.save()
            instructor_application.delete()
            return Response({"message": "강사 등록이 완료되었습니다."}, status=status.HTTP_200_OK)
        
        return Response({"message": "이미 등록된 강사입니다."}, status=status.HTTP_200_OK)
    else:
        instructor_application.delete()
        return Response({"message": "강사 등록이 거절되었습니다."}, status=status.HTTP_200_OK)
        
    
# 강사 센터목록 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def instructor_center_list(request):
    instructor=Instructor.objects.get(user=request.user)
    center_list=instructor.center.all()
    center_serializer = CenterSerializer(center_list, many=True)
    return Response(center_serializer.data, status=status.HTTP_200_OK)


