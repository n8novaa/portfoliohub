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
    
    
