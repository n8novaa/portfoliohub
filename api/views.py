from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveAPIView

from projects.models import Project
from .serializers import ProjectSerializer

from accounts.models import Profile
from .serializers import ProfileSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProfileAPIView(RetrieveAPIView):

    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()