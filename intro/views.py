from django.shortcuts import render

# Create your views here.
def intro_alex(request):
  return render(request, 'intro/intro_alex.html')

def intro_parrot(request):
  return render(request, 'intro/intro_parrot.html')

def intro_CNU(request):
  return render(request, 'intro/intro_CNU.html')

def intro_release(request):
  return render(request, 'intro/intro_release.html')