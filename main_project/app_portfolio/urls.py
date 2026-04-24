from django.urls import path
from . import views

urlpatterns = [
    path('investments/add/',views.add_investment, name='add_investment'),
    path('investments/',views.get_investments,name='get_investments'),
    path('investments/update/<int:investment_id>/',views.update_investment,name='update_investment'),
    path('investments/delete/<int:investment_id>/',views.delete_investment,name='delete_investment'),
    path('investments/simulate/',views.simulate_market,name='simulate_market')
]