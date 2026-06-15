from django.shortcuts import render
from experience.models import Experience

def experience_page(request):
    experiences = Experience.objects.all().order_by('-start_date')

    return render(request, "pages/experience.html", {
        "experiences": experiences
    })

