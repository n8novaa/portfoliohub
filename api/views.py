from django.shortcuts import render

from rest_framework.generics import ListAPIView

from projects.models import Project
from .serializers import ProjectSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer