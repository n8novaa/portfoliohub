from django.shortcuts import render
from accounts.models import Profile

def home(request):
    profile = Profile.objects.first()
    return render(request, 'pages/home.html', {'profile': profile})
