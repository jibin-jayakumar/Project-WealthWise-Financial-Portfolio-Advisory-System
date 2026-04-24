# from django import forms
# from django.contrib.auth.models import User
# from django.core.exceptions import ValidationError
# import re

# class UserRegestration(forms.Form):
#     username=forms.CharField(max_length=100)
#     age=forms.IntegerField()
#     email=forms.EmailField(max_length=150)
#     phone_number=forms.CharField(min_length=10,max_length=15)
#     password=forms.CharField(widget=forms.PasswordInput)
#     confirm_password=forms.CharField(widget=forms.PasswordInput)

#     def clean_username(self):
#         username=self.cleaned_data.get('username')
#         if User.objects.filter(username=username).exists():
#             raise ValidationError('User already exist')
#         return username
    
#     def clean_age(self):
#         age=self.cleaned_data.get('age')
#         if age<18:
#             raise ValidationError("User must be above 18 years old")
#         return age
    
#     def clean_email(self):
#         email=self.cleaned_data.get('email')
#         if User.objects.filter(email=email).exists():
#             raise ValidationError("Email is alraedy registered")
#         return email
    

#     def clean_phone_number(self):
#        phone_number = self.cleaned_data.get('phone_number')
#        if not re.match(r'^\+?[1-9][0-9]+$', phone_number):
#         raise ValidationError("Phone number cannot start with 0. Can optionally start with +")
#        return phone_number
    
#     def clean_password(self):
#         password = self.cleaned_data.get('password') 
#         if len(password)<5:
#             raise ValidationError("password must have 5 figures")
#         return password
    
#     def clean(self):
#         cleaned_data=super().clean()
#         password=cleaned_data.get('password')
#         confirm_password=cleaned_data.get('confirm_password')
#         if password and confirm_password and password!= confirm_password:
#             raise ValidationError("password dont match")
#         return cleaned_data


# class AdvisorRegistration(UserRegestration):
#     expertise=forms.CharField(max_length=200,help_text="eg: Crypto, Stockmarket ,Bonds")
#     years_of_experience=forms.IntegerField(min_value=0,max_value=50)
#     bio=forms.CharField(widget=forms.Textarea,help_text="Tell about yourself")
#     qualification=forms.CharField(max_length=200,required=True)

#     def clean_expertise(self):
#         expertise=self.cleaned_data.get('expertise')
#         if len(expertise)<2:
#             raise ValidationError("Must be atleast 2 characters")
#         return expertise
    
#     def clean_years_of_experience(self):
#         years_of_experience=self.cleaned_data.get('years_of_experience')
#         if years_of_experience<2:
#             raise ValidationError("Advisor must have atleast 2 years experince in related field")
#         return years_of_experience
    
#     def clean_bio(self):
#         bio=self.cleaned_data.get('bio')
#         return bio
    
#     def clean_qualification(self):
#         qualification=self.cleaned_data.get('qualification')
#         return qualification
