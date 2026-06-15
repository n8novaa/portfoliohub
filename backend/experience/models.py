from django.db import models

class Experience(models.Model):
    title = models.CharField(max_length=100)
    organization = models.CharField(max_length=100, blank=True)
    description = models.TextField()

    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    is_current = models.BooleanField(default=False)

    def __str__(self):
        return self.title

