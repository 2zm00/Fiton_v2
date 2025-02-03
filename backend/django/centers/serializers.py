from rest_framework import serializers
from .models import Center,Exercise,Amenity,Membership,MembershipOwner

from rest_framework import serializers
from .models import Center, Exercise, Amenity

from rest_framework import serializers
from .models import Center, Exercise, Amenity

from rest_framework import serializers
from .models import Center, Exercise, Amenity
from rest_framework import serializers
from .models import Center, Exercise, Amenity

class CenterSerializer(serializers.ModelSerializer):
    exercise = serializers.SerializerMethodField()
    amenity = serializers.SerializerMethodField()

    class Meta:
        model = Center
        fields = ["id","name","location","image","exercise","amenity"]

    def get_exercise(self, obj):
        """ ManyToMany 관계 데이터를 운동 이름 리스트로 변환 """
        return list(obj.exercise.values_list('name', flat=True))

    def get_amenity(self, obj):
        """ ManyToMany 관계 데이터를 편의시설 이름 리스트로 변환 """
        return list(obj.amenity.values_list('name', flat=True))

    def create(self, validated_data):
        exercise_names = self.initial_data.get('exercise', [])
        amenity_names = self.initial_data.get('amenity', [])

        center = Center.objects.create(**validated_data)

        # 이름으로 객체 찾고 없으면 생성
        exercises = [Exercise.objects.get_or_create(name=name)[0] for name in exercise_names]
        amenities = [Amenity.objects.get_or_create(name=name)[0] for name in amenity_names]

        center.exercise.set(exercises)
        center.amenity.set(amenities)

        return center

    def update(self, instance, validated_data):
        exercise_names = self.initial_data.get('exercise', None)
        amenity_names = self.initial_data.get('amenity', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if exercise_names is not None:
            exercises = [Exercise.objects.get_or_create(name=name)[0] for name in exercise_names]
            instance.exercise.set(exercises)

        if amenity_names is not None:
            amenities = [Amenity.objects.get_or_create(name=name)[0] for name in amenity_names]
            instance.amenity.set(amenities)

        return instance



class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['id','price','duration']


class MembershipOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipOwner
        fields = ['id','price','duration']