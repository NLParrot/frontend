# food/urls.py
from django.urls import path
from .import views

urlpatterns = [
  path('', views.food_list, name='food_list'),
  path('jeong/', views.food_jeong, name='food_jeong'),
  path('nam/', views.food_nam, name='food_nam'),
  path('hoo/', views.food_hoo, name='food_hoo'),
  path('shinchon/', views.food_shinchon, name='food_shinchon'),
  path('<int:food_id>/', views.food_detail, name='food_detail'),
]