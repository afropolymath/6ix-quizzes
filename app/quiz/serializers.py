from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from .models import Quiz, Question
from authentication.serializers import AccountSerializer


class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    class Meta:
        model = Question


class QuizSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        read_only_fields = ('date_created', 'date_modified')
