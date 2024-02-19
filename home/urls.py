# home/urls.py
from django.urls import path
from . import views

urlpatterns = [
  path('', views.chat, name='home'),
  path('map', views.map, name='map')
]
