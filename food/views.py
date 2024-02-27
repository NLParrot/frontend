from django.shortcuts import render, redirect, get_object_or_404
from .models import Food
from django.http import JsonResponse
import random

# Create your views here.
def food_list(request):
  foods = Food.objects.filter().order_by('restaurant')
  return render(request, 'food/food_list.html', {'foods': foods})#'random_food': random_food}

def food_jeong(request):
  foods = Food.objects.filter(location="정문").order_by('restaurant')
  return render(request, 'food/food_jeong.html', {'foods': foods})

def food_nam(request):
  foods = Food.objects.filter(location="남문").order_by('restaurant')
  return render(request, 'food/food_nam.html', {'foods': foods})

def food_hoo(request):
  foods = Food.objects.filter(location="후문").order_by('restaurant')
  return render(request, 'food/food_hoo.html', {'foods': foods})

def food_shinchon(request):
  foods = Food.objects.filter(location="신촌").order_by('restaurant')
  return render(request, 'food/food_shinchon.html', {'foods': foods})

def food_detail(request, food_id):
  food = get_object_or_404(Food, pk=food_id)
  return render(request, 'food/food_detail.html', {'food': food})