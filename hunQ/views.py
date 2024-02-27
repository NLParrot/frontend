from django.shortcuts import render
from .models import Question

# Create your views here.
def question_search(request):
    query = request.GET.get('q', '')  # 검색어를 가져옵니다.

    # 검색어가 제공되면 해당 키워드를 포함하는 데이터를 필터링합니다.
    if query:
        questions = Question.objects.filter(question__icontains=query)
    else:
        questions = Question.objects.all()

    return render(request, 'hunQ/hunQ.html', {'query': query, 'questions': questions})