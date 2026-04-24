from django.db import models
from django.contrib.auth.models import User

class AdvisorHire(models.Model):
    investor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hire_advisor')
    advisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clients')
    hired_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    # class Meta:
    #     unique_together = ['investor','advisor']

    def __str__(self):
        return f"{self.investor.username} hired {self.advisor.username}"


class Recommendation(models.Model):
    advisor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_recommendations')
    investor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recieved_recommendations')
    message = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recommendation from {self.advisor.username} to {self.investor.username}"
