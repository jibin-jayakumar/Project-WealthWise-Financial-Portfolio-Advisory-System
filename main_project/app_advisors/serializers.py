from rest_framework import serializers
from django.contrib.auth.models import User
from .models import AdvisorHire,Recommendation

class AdvisorListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    expertise = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField() 
    years_of_experience = serializers.SerializerMethodField()  
    qualification = serializers.SerializerMethodField()  

    class Meta:
        model= User
        fields = ['id','username','name','expertise','bio','years_of_experience','qualification']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"    
    
    def get_expertise(self, obj):
        if hasattr(obj, 'advisor_detail'):
            return obj.advisor_detail.expertise
        return "Financial Advisor"
    
    def get_bio(self, obj):
        if hasattr (obj, 'advisor_detail'):
            return obj.advisor_detail.bio
        return ""
    
    def get_years_of_experience(self, obj):  
        if hasattr(obj, 'advisor_detail'):
            return obj.advisor_detail.years_of_experience
        return 0
    
    def get_qualification(self, obj):  
        if hasattr(obj, 'advisor_detail'):
            return obj.advisor_detail.qualification
        return "Not specified"

class AdvisorHireSerializer(serializers.ModelSerializer):
    advisor_name = serializers.SerializerMethodField()

    class Meta:
        model = AdvisorHire
        fields = ['id','advisor','advisor_name','hired_date']
        read_only_fields = ['id','hired_date']

    def get_advisor_name(self, obj):
        return f"{obj.advisor.first_name} {obj.advisor.last_name}"

class RecommendationSerializer(serializers.ModelSerializer):
    advisor_name = serializers.SerializerMethodField()

    class Meta:
        model = Recommendation
        fields = ['id','advisor','advisor_name','message','created_date']
        read_only_fields = ['id','created_date']

    def get_advisor_name(self, obj):
        return f"{obj.advisor.first_name} {obj.advisor.last_name}"       