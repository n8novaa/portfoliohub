from django.contrib import admin
from .models import Profile, Education

admin.site.register(Profile)

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "start_year", "end_year")


