from django.urls import path,include
from .import views

urlpatterns = [
    path('advisors/',views.get_advisors,name='get_advisors'),
    path('hire/',views.hire_advisor,name='hire_advisor'),
    path('my-advisor/',views.get_my_advisor,name='get_my_advisor'),
    path('my-clients/',views.get_my_clients,name='get_my_clients'),
    path('client-portfolio/<int:investor_id>/',views.view_client_portfolio,name='view_client_portfolio'),
    path('recommendations/give/',views.give_recommendation,name='give_recommendation'),
   path('release/', views.release_advisor, name='release_advisor'),
    path('recommendations/',views.get_my_recommendations,name='get_my_recommendations'),
]