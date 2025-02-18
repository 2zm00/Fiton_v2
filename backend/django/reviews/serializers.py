# from rest_framework import serializers
# from .models import Review
# from users.serializers import MemberSerializer
# from lessons.serializers import LessonSerializer

from rest_framework import serializers
from .models import Review
from users.serializers import MemberSerializer
from lessons.serializers import LessonSerializer
from lessons.models import Lesson
from users.models import Instructor
from django.db.models import Avg

class ReviewSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)  # 수강생 정보 포함 (읽기 전용)
    lesson = serializers.PrimaryKeyRelatedField(queryset=Lesson.objects.all(), write_only=True)  # lesson ID 입력 받기

    class Meta:
        model = Review
        fields = ['id', 'member', 'lesson', 'rating', 'comment', 'created_at', 'updated_at']

    def validate_rating(self, value):
        """ 평점은 1~5 사이의 값이어야 함 """
        if value < 1 or value > 5:
            raise serializers.ValidationError("평점은 1에서 5 사이여야 합니다.")
        return value

    def create(self, validated_data):
        """ 리뷰 생성 후 강사의 평균 평점을 업데이트 """
        member = self.context['request'].user.member
        lesson = validated_data['lesson']
        validated_data['member'] = member
        review = Review.objects.create(**validated_data)

        #  강사의 평균 평점 업데이트
        instructor = lesson.instructor
        reviews = Review.objects.filter(lesson__instructor=instructor)
        average_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        instructor.average_rating = round(average_rating, 1)
        instructor.save()

        return review

    def update(self, instance, validated_data):
        """ 리뷰 수정 후 강사의 평균 평점을 업데이트 """
        instance.rating = validated_data.get('rating', instance.rating)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()

        # 리뷰 수정 후 강사의 평균 평점 업데이트
        instructor = instance.lesson.instructor
        reviews = Review.objects.filter(lesson__instructor=instructor)
        average_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        instructor.average_rating = round(average_rating, 1)
        instructor.save()

        return instance







# class ReviewSerializer(serializers.ModelSerializer):
#     member = MemberSerializer(read_only=True)  # 수강생 정보 포함
#     lesson = LessonSerializer(read_only=True)  # 수업 정보 포함

#     class Meta:
#         model=Review
#         field=['id','member','lesson','rating','comment','created_at','updated_at']

#     def validate_rating(self, value):
#         """ 평점은 1~5 사이의 값이어야 함 """
#         if value < 1 or value > 5:
#             raise serializers.ValidationError("평점은 1에서 5 사이여야 합니다.")
#         return value