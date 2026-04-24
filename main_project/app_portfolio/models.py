from django.db import models
from django.contrib.auth.models import User

class Investment(models.Model):
    INVESTMENT_TYPES=[
        ('commodity','Commodity'),
        ('stock','Stock'),
        ('crypto','Cryptocurrency'),
    ]

    investor = models.ForeignKey(User,on_delete=models.CASCADE,related_name='investments')
    type = models.CharField(max_length=10,choices=INVESTMENT_TYPES)
    name = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=20,decimal_places=8)
    buy_price = models.DecimalField(max_digits=20, decimal_places=2)
    current_price = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.investor.username} - {self.quantity} {self.name}"
    