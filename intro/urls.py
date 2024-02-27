# intro/urls.py
from django.urls import path
from . import views

urlpatterns = [
  path('alex/', views.intro_alex, name='intro_alex'),
  path('parrot/', views.intro_parrot, name='intro_parrot'),
  path('CNU/', views.intro_CNU, name='intro_CNU'),
  path('release/', views.intro_release, name='intro_release'),
]