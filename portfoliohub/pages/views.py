from django.shortcuts import render
from accounts.models import Profile
from projects.models import Project

def home(request):
    profile = Profile.objects.first()
    featured_projects = Project.objects.filter(
        is_featured=True,
        slug__isnull=False
        ).exclude(slug='')
    return render(request, 'pages/home.html', {
        'profile': profile,
        'featured_projects' : featured_projects
        })

def about(request):
    profile = Profile.objects.first()
    return render(request, 'pages/about.html',{
        "profile": profile
    })

