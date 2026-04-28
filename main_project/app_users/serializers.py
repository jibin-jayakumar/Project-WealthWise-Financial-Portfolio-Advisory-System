from rest_framework import serializers
from django.contrib.auth.models import User
import re
from .models import Profile, AdvisorDetail


class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)  
    last_name = serializers.CharField(max_length=100)  
    age = serializers.IntegerField()
    email = serializers.EmailField(max_length=150)
    phone_number = serializers.CharField(min_length=10, max_length=15)
    password = serializers.CharField(write_only=True, min_length=5)
    confirm_password = serializers.CharField(write_only=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("User already exists")
        return value
    

    def validate_first_name(self, value):
        if len(value) > 100:
             raise serializers.ValidationError("First name cannot exceed 100 characters")
        if not re.match(r'^[A-Za-z\s\-]+$', value):
             raise serializers.ValidationError("First name can only contain letters, spaces, and hyphens")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("First name must be at least 2 characters")
        return value

    def validate_last_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("Last name cannot exceed 100 characters")
        if not re.match(r'^[A-Za-z\s\-]+$', value):
            raise serializers.ValidationError("Last name can only contain letters, spaces, and hyphens")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Last name must be at least 2 characters")
        return value




    def validate_age(self, value):
        if value < 18:
            raise serializers.ValidationError("User must be above 18 years old")
        if value > 100:
            raise serializers.ValidationError("Age must be between 18 and 100")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered")
        return value

    def validate_phone_number(self, value):
        if not re.match(r'^\+?[1-9][0-9]+$', value):
            raise serializers.ValidationError("Phone number cannot start with 0. Can optionally start with +")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        # Remove confirm_password
        validated_data.pop('confirm_password')
        
        # Extract Profile fields
        age = validated_data.pop('age')
        phone_number = validated_data.pop('phone_number')
        
        # Create User
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        
        # Create Profile
        Profile.objects.create(
            user=user,
            age=age,
            phone_number=phone_number,
            user_type='investor'
        )
        
        return user


class AdvisorRegistrationSerializer(UserRegistrationSerializer):
    expertise = serializers.CharField(max_length=200)
    years_of_experience = serializers.IntegerField(min_value=2, max_value=50)
    bio = serializers.CharField()
    qualification = serializers.CharField(max_length=200)

    def validate_expertise(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Must be at least 2 characters")
        return value

    def validate_years_of_experience(self, value):
        if value < 2:
            raise serializers.ValidationError("Advisor must have at least 2 years experience")
        return value

    def create(self, validated_data):
        # Remove confirm_password
        validated_data.pop('confirm_password')
        
        # Extract Profile fields
        age = validated_data.pop('age')
        phone_number = validated_data.pop('phone_number')
        
        # Extract Advisor fields
        expertise = validated_data.pop('expertise')
        years_of_experience = validated_data.pop('years_of_experience')
        bio = validated_data.pop('bio')
        qualification = validated_data.pop('qualification')
        
        # Create User
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        
        # Create Profile
        Profile.objects.create(
            user=user,
            age=age,
            phone_number=phone_number,
            user_type='advisor'
        )
        
        # Create AdvisorDetail
        AdvisorDetail.objects.create(
            user=user,
            expertise=expertise,
            years_of_experience=years_of_experience,
            bio=bio,
            qualification=qualification
        )
        
        return user