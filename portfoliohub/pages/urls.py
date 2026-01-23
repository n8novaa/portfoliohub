from django.urls import path
from .views import home, about, skills, education_page


urlpatterns = [
    path('', home, name='home'),
    path("about/", about, name="about"),
    path("skills/", skills, name="skills"),
    path("education/", education_page, name="education"),
    
]