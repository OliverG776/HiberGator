# api/models.py
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(blank=True, null=True)  # optional extra field
    created_at = models.DateTimeField(auto_now_add=True)  # timestamp

    def __str__(self):
        return f"{self.name} ({self.age})"
