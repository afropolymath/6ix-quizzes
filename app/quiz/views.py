from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import permissions

from .models import Quiz, Question
from .serializers import QuizSerializer, QuestionSerializer


class QuizCreateList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_queryset(self):
        q = self.request.query_params.get('q')
        results = Quiz.objects.filter(creator=self.request.user)

        if q:
            results = results.filter(title__icontains=q)

        return results

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class QuizViewUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer

    lookup_url_kwarg = 'quiz_id'

    def get_queryset(self):
        return Quiz.objects.filter(creator=self.request.user)


class QuestionInterceptorMixin(object):
    @property
    def current_quiz(self):
        quiz_id = self.kwargs.get('quiz_id')
        return get_object_or_404(
            Quiz,
            pk=quiz_id,
            creator=self.request.user
        )


class QuestionCreate(
        QuestionInterceptorMixin,
        generics.CreateAPIView
    ):
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(quiz=self.current_quiz)


class QuestionUpdateDestroy(
        QuestionInterceptorMixin,
        generics.RetrieveUpdateDestroyAPIView
    ):
    serializer_class = QuestionSerializer

    def get_object(self):
        question_id = self.kwargs.get('question_id')
        queryset = Question.objects.filter(quiz=self.current_quiz)
        return get_object_or_404(queryset, pk=question_id)
