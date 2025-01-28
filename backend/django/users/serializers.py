from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CenterOwner, Instructor, Member
FitonUser = get_user_model()

class FitonUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = FitonUser
        fields = ('id', 'username', 'password',)

    def create(self, validated_data):
        user = FitonUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

class UserAdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FitonUser
        fields = ['name', 'profile_image', 'gender','birth', 'phone_number']
        

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