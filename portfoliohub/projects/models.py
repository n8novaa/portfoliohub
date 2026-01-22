from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    short_description = models.CharField(max_length=255)
    description = models.TextField()
    tech_stack = models.CharField(
        max_length=200,
        help_text="comma-seperated technologies"
    )
    github_url = models.URLField()
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateField()

    def __str__(self):
        return self.title


