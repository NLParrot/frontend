# home/urls.py
from django.urls import path
from .views import question_search

urlpatterns = [
  path('', question_search, name='hunQ'),
]