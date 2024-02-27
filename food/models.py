from django.db import models

# Create your models here.
class Food(models.Model):
  restaurant = models.CharField(max_length=100) #가게 이름
  category = models.CharField(max_length=10) #한중양일식 중 하나 혹은 기타
  location = models.CharField(max_length=10) #위치(정문 후문 남문 신촌 등)
  location_detail = models.TextField(blank=True)
  description = models.TextField(blank=True) #대표메뉴 등
  image = models.TextField(blank=True)
  image_url = models.TextField(blank=True)

  def __str__(self):
    return self.restaurant