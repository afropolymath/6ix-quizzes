from django.db import models


class Quiz(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    timed = models.BooleanField(default=False)
    duration = models.IntegerField(default=5)
    max_score = models.IntegerField()
    attachment = models.TextField(blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    creator = models.ForeignKey(
        'authentication.Account',
        on_delete=models.CASCADE,
        related_name="quizzes"
    )


class Question(models.Model):
    question_text = models.TextField()
    option_A = models.CharField(max_length=300)
    option_B = models.CharField(max_length=300)
    option_C = models.CharField(max_length=300, blank=True)
    option_D = models.CharField(max_length=300, blank=True)
    option_E = models.CharField(max_length=300, blank=True)
    correct_answer = models.IntegerField()

    quiz = models.ForeignKey(
        'Quiz',
        on_delete=models.CASCADE,
        related_name="questions"
    )
