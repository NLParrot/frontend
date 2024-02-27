from django.db import models

# Create your models here.

class Question(models.Model):
  title = models.CharField(max_length=255)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)

class Answer(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)