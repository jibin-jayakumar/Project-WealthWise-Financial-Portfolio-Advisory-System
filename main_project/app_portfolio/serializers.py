from rest_framework import serializers
from .models import Investment

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = ['id','type','name','quantity','buy_price','current_price','purchase_date']
        read_only_fields = ['id','purchase_date']
        