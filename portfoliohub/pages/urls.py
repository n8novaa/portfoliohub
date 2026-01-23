from django.urls import path
from .views import home, about, skills


urlpatterns = [
    path('', home, name='home'),
    path("about/", about, name="about"),
    path("skills/", skills, name="skills"),
    
]