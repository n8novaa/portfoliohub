from django.urls import path

from .views import ProjectListAPIView
from .views import ProfileAPIView

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

]