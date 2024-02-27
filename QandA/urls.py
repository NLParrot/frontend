# myapp/urls.py
from django.urls import path
from .views import question_list, question_detail, ask_question, answer_question

urlpatterns = [
  path('', question_list, name='question_list'),
  path('<int:question_id>/', question_detail, name='question_detail'),
  path('ask/', ask_question, name='ask_question'),
  path('answer/<int:question_id>/', answer_question, name='answer_question'),
]