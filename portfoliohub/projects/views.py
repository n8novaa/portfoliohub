from django.shortcuts import render, get_object_or_404
from .models import Project

def project_list(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, 'projects/project_list.html', {
        'projects': projects
        })

def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)

    formatted_title = project.title.replace(" ", "-")

    return render(request, "projects/project_detail.html", {
        "project": project,
        "formatted_title": formatted_title,
    })


