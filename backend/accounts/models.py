from django.db import models

class Profile(models.Model):
    WORK_STATUS_CHOICES = [
        ("open_to_work", "Open to Work"),
        ("employed", "Currently Working"),
        ("freelancing", "Available for Freelance"),
    ]

    full_name = models.CharField(max_length=100)
    headline = models.CharField(max_length=150)
    description = models.TextField()
    bio = models.TextField()
    skills = models.TextField(help_text="comma-seperated skills")
    email = models.EmailField()
    github_url = models.URLField()
    linkedin_url = models.URLField(blank=True)
    work_status = models.CharField(
        max_length=20,
        choices=WORK_STATUS_CHOICES,
        default="open_to_work",
    )
    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True,
        help_text="Upload your CV/Resume (PDF recommended)"
    )

    profile_image = models.ImageField(
        upload_to="profile/",
        blank=True,
        null=True,
        help_text="Upload your profile photo"
    )

    def __str__(self):
        return self.full_name
    
class Education(models.Model):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="education"
    )
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=150)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.degree} - {self.institution}"
    
    
