from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^docs/', include('rest_framework_docs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/auth/', include('authentication.urls')),
    url(r'^api/v1/quizzes/', include('quiz.urls')),
]
