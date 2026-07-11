from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveAPIView

from projects.models import Project
from .serializers import ProjectSerializer

from accounts.models import Profile, Education
from .serializers import ProfileSerializer, EducationSerializer

from experience.models import Experience
from .serializers import ExperienceSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProfileAPIView(RetrieveAPIView):

    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()

class ExperienceListAPIView(ListAPIView):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer

class EducationListAPIView(ListAPIView):
    queryset = Education.objects.all().order_by('-start_year')
    serializer_class = EducationSerializer