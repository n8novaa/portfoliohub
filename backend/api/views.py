from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveAPIView

from projects.models import Project
from .serializers import ProjectSerializer

from accounts.models import Profile, Education
from .serializers import ProfileSerializer, EducationSerializer

from experience.models import Experience
from .serializers import ExperienceSerializer

from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status


from django.conf import settings
# pyrefly: ignore [missing-import]
import sib_api_v3_sdk   


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

@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
def ContactAPIView(request):
    name = request.data.get("name", "").strip()
    email = request.data.get("email", "").strip()
    message = request.data.get("message", "").strip()

    if not name or not email or not message:
        return Response(
            {"error": "All fields are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key["api-key"] = settings.BREVO_API_KEY

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    email_data = sib_api_v3_sdk.SendSmtpEmail(
        sender={
            "email": settings.EMAIL_HOST_USER,
            "name": "Portfolio Contact",
        },
        to=[
            {
                "email": settings.EMAIL_HOST_USER,
            }
        ],
        reply_to={
            "email": email,
            "name": name,
        },
        subject=f"Portfolio Contact: {name}",
        text_content=(
            f"Name: {name}\n"
            f"Email: {email}\n\n"
            f"Message:\n{message}"
        ),
    )

    try:
        api_instance.send_transac_email(email_data)

        return Response(
            {"message": "Message sent successfully."},
            status=status.HTTP_200_OK,
        )

    except Exception as error:
        print("Contact email error:", error)

        return Response(
            {"error": "Unable to send message. Please try again later."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )