from django.shortcuts import render, redirect
from .models import Food

# Create your views here.
def food_list(request):
  foods = Food.objects.filter()
  return render(request, 'food/food_list.html', {'foods': foods})

def food_jeong(request):
  foods = Food.objects.filter(location="정문")
  return render(request, 'food/food_list.html', {'foods': foods})

def food_nam(request):
  foods = Food.objects.filter(location="남문")
  return render(request, 'food/food_list.html', {'foods': foods})

def food_hoo(request):
  foods = Food.objects.filter(location="후문")
  return render(request, 'food/food_list.html', {'foods': foods})

def food_shinchon(request):
  foods = Food.objects.filter(location="신촌")
  return render(request, 'food/food_list.html', {'foods': foods})