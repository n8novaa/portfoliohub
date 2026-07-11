from django.urls import path

from .views import ProjectListAPIView
from .views import ProfileAPIView
from .views import ExperienceListAPIView
from .views import EducationListAPIView

urlpatterns = [

    path(
        "projects/",
        ProjectListAPIView.as_view(),
        name="api-projects",
    ),

    path(
    "profile/",
    ProfileAPIView.as_view(),
    name="api-profile",
),
    path(
        "experience/",
        ExperienceListAPIView.as_view(),
        name="api-experience",
    ),
    path(
        "education/",
        EducationListAPIView.as_view(),
        name="api-education",
    ),

]