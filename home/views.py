from django.shortcuts import render
import json
import os

module_dir = os.path.dirname(__file__)  # get current directory
building_path = os.path.join(module_dir, 'static/data/building_data.json')

# Create your views here.
def chat(request):
    return render(request, 'home/home.html')

def map(request):
    with open(building_path) as json_data:
        data = json.load(json_data)
    print(data)
    return render(request, 'home/map.html')
