from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CenterOwner, Instructor, Member
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
FitonUser = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # 사용자 정보 추가
        data['username'] = self.user.username

        return data
class FitonUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True,required=False)

    class Meta:
        model = FitonUser
        fields = ('id', 'username', 'password', 'name', 'profile_image','role', 'gender', 'birth', 'phone_number')

    def create(self, validated_data):
        
        user = FitonUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

        
        user.name = validated_data.get('name', None)
        user.profile_image = validated_data.get('profile_image', None)
        user.gender = validated_data.get('gender', "None")
        user.birth = validated_data.get('birth', None)
        user.phone_number = validated_data.get('phone_number', None)
        user.role = validated_data.get('role', None)

        user.save()
        return user

class CenterOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterOwner
        fields = ['business_registration_number']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['specialties', 'years_of_experience', 'certifications', 'bio']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['bio']