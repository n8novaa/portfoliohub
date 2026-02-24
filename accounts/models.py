from django.db import models

class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    headline = models.CharField(max_length=150)
    bio = models.TextField()
    skills = models.TextField(help_text="comma-seperated skills")
    email = models.EmailField()
    github_url = models.URLField()
    linkedin_url = models.URLField(blank=True)

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
    
    
