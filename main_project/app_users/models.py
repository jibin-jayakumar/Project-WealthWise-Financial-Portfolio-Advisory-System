# from django.db import models
# from django.contrib.auth.models import User
# from django.core.validators import MinValueValidator, MaxValueValidator


# class Profile(models.Model):
#     USER_TYPES = [
#         ('investor', 'Investor'),
#         ('advisor', 'Financial Advisor'),
#     ]
    
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
#     age = models.IntegerField(validators=[MinValueValidator(18)])
#     phone_number = models.CharField(max_length=15)  
#     user_type = models.CharField(max_length=10, choices=USER_TYPES, default='investor')
    
#     def __str__(self):
#         return f"{self.user.username} - {self.get_user_type_display()}"


# class AdvisorDetail(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='advisor_detail')
#     expertise = models.CharField(max_length=200)
#     years_of_experience = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(50)])
#     bio = models.TextField()
#     qualification = models.CharField(max_length=200)
#     is_verified = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"Advisor: {self.user.username} - {self.expertise}"

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Profile(models.Model):
    USER_TYPES = [
        ('investor', 'Investor'),
        ('advisor', 'Financial Advisor'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    age = models.IntegerField(validators=[MinValueValidator(18)])
    phone_number = models.CharField(max_length=15)  
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='investor')
    
    def __str__(self):
        return f"{self.user.username} - {self.get_user_type_display()}"


class AdvisorDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='advisor_detail')
    expertise = models.CharField(max_length=200)
    years_of_experience = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(50)])
    bio = models.TextField()
    qualification = models.CharField(max_length=200)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Advisor: {self.user.username} - {self.expertise}"