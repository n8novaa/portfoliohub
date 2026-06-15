from django.shortcuts import render
from accounts.models import Profile, Education
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

def skills(request):
    profile = Profile.objects.first()

    skills_list = []
    if profile and profile.skills:
        skills_list = [s.strip() for s in profile.skills.split(",")]

    return render(request, "pages/skills.html", {
        "profile": profile,
        "skills_list": skills_list,
    })

def education_page(request):
    profile = Profile.objects.first()
    education_list = profile.education.all() if profile else []

    return render(request, "pages/education.html", {
        "education_list": education_list
    })



def connect_page(request):
    profile = Profile.objects.first()

    return render(request, "pages/connect.html", {
        "profile": profile
    })


