from django.urls import path,include
from .import views

urlpatterns = [
    path('register/investor/', views.register_investor, name='register_investor'),
    path('register/advisor/', views.register_advisor, name='register_advisor'),
    path('login/', views.login, name='login'),
    path('user/profile/', views.get_profile,name='user_profile'),
]
