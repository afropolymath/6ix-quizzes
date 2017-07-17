from django.conf.urls import url, include

from .views import QuizCreateList, QuizViewUpdateDelete, QuestionCreate, QuestionUpdateDestroy

urlpatterns = [
    url(r'^$', QuizCreateList.as_view()),
    url(r'^(?P<quiz_id>[0-9]+)/?$', QuizViewUpdateDelete.as_view()),
    url(r'^(?P<quiz_id>[0-9]+)/questions/?$', QuestionCreate.as_view()),
    url(r'^(?P<quiz_id>[0-9]+)/questions/(?P<question_id>[0-9]+)/?$', QuestionUpdateDestroy.as_view()),
]
