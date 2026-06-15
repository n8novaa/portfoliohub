
from django.urls import path
from .views import experience_page

urlpatterns = [
    path("", experience_page, name="experience"),
]
