from django.shortcuts import render, get_object_or_404, redirect
from .models import Question, Answer
from .forms import QuestionForm, AnswerForm

# Create your views here.
def question_list(request):
  questions = Question.objects.all()
  return render(request, 'QandA/question_list.html', {'questions': questions})

def question_detail(request, question_id):
  question = get_object_or_404(Question, pk=question_id)
  answers = Answer.objects.filter(question=question)
  return render(request, 'QandA/question_detail.html', {'question': question, 'answers': answers})

def ask_question(request):
  if request.method == 'POST':
    form = QuestionForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect('question_list')
  else:
    form = QuestionForm()
  return render(request, 'QandA/ask_question.html', {'form': form})

'''
def answer_question(request, question_id):
  question = get_object_or_404(Question, pk=question_id)
  if request.method == 'POST':
    form = AnswerForm(request.POST)
    if form.is_valid():
      answer = form.save(commit=False)
      answer.question = question  # 질문을 지정
      answer.save()
  else:
    form = AnswerForm()
  return render(request, 'QandA/answer_question.html', {'form': form, 'question': question})
'''
def answer_question(request, question_id):
  question = get_object_or_404(Question, pk=question_id)

  if request.method == 'POST':
    form = AnswerForm(request.POST)
    if form.is_valid():
      answer = form.save(commit=False)
      answer.question = question
      answer.save()
      return redirect('question_detail', question_id=question.id)
  else:
    form = AnswerForm()

  return render(request, 'QandA/answer_question.html', {'form': form, 'question': question})