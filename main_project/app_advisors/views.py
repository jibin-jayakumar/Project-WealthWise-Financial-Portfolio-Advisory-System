from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from app_portfolio.models import Investment
from app_portfolio.serializers import InvestmentSerializer
from .models import AdvisorHire,Recommendation
from .serializers import AdvisorListSerializer,AdvisorHireSerializer,RecommendationSerializer


#getting all advisors

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_advisors(request):
    advisors = User.objects.filter(profile__user_type='advisor')
    serializer = AdvisorListSerializer(advisors, many=True)
    return Response(serializer.data)

# hiring Advisor

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def hire_advisor(request):
    advisor_id = request.data.get('advisor_id')

    try:
        advisor = User.objects.get(id=advisor_id, profile__user_type='advisor')
    except User.DoesNotExist:
        return Response({'error':'Advisor not found'},status=status.HTTP_404_NOT_FOUND )

    already_hired = AdvisorHire.objects.filter(investor=request.user, advisor=advisor, is_active=True).exists()
    if already_hired:
        return Response({'error':'You already hired this advisor'},status=status.HTTP_400_BAD_REQUEST)

    hire = AdvisorHire.objects.create(investor=request.user, advisor=advisor)
    serializer = AdvisorHireSerializer(hire)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# Get hired advisor 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_advisor(request):
        hire = AdvisorHire.objects.filter(investor=request.user, is_active=True).first()
        if hire:
           serializer = AdvisorHireSerializer(hire)
           return Response(serializer.data)
        return Response({'message':'No advisor hired yet'},status=status.HTTP_200_OK)   
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def release_advisor(request):
        hire = AdvisorHire.objects.filter(investor=request.user, is_active=True).first()
        if hire:
            hire.is_active = False
            hire.save()
            return Response({'message': 'Advisor released successfully'}, status=status.HTTP_200_OK)
        return Response({'error': 'No active advisor found'}, status=status.HTTP_404_NOT_FOUND)


#  Get client

@api_view(['GET'])   
@permission_classes([IsAuthenticated])
def get_my_clients(request):
    if not hasattr(request.user, 'profile')or request.user.profile.user_type != 'advisor':
        return Response({'error':'Only advisor can view clients'}, status=status.HTTP_403_FORBIDDEN)
    hires = AdvisorHire.objects.filter(advisor=request.user, is_active=True)
    clients = []
    for hire in hires:
        clients.append({
            'investor_id':hire.investor.id,
            'investor_name':f"{hire.investor.first_name} {hire.investor.last_name}",
            'investor_email':hire.investor.email,
            'hired_date':hire.hired_date,
        })
    return Response(clients)
    
# viewing client profile

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_client_portfolio(request, investor_id):
    if not hasattr(request.user, 'profile') or request.user.profile.user_type != 'advisor':
        return Response({'error':'Only advisor can view client porfolios'},status=status.HTTP_403_FORBIDDEN)

    try:
        hire = AdvisorHire.objects.get(advisor=request.user, investor_id=investor_id, is_active=True)    
    except AdvisorHire.DoesNotExist:
        return Response({'error':'you are not authorized to view this portfolio'}, status=status.HTTP_403_FORBIDDEN)

    investments = Investment.objects.filter(investor_id=investor_id)
    serializer = InvestmentSerializer(investments, many=True)

    total_value = 0
    for inv in investments:
        price = inv.current_price if inv.current_price else inv.buy_price
        total_value += float(inv.quantity) * float(price)

    return Response({
        'investor_name': f"{hire.investor.first_name} {hire.investor.last_name}",
        'total_value': round(total_value, 2),
        'investments': serializer.data
    })     

# giving recommendations

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def give_recommendation(request):
        if not hasattr(request.user,'profile') or request.user.profile.user_type !='advisor':
            return Response({'error':'Only advisors can give recommendations'}, status=status.HTTP_403_FORBIDDEN)
        
        investor_id = request.data.get('investor_id')
        message = request.data.get('message')

        if not message :
            return Response({'error':'Investor not found'},status=status.HTTP_404_NOT_FOUND)
        
        try:
            investor = User.objects.get(id=investor_id)
        except User.DoesNotExist:
            return Response({'error':'Investor not found'},status=status.HTTP_404_NOT_FOUND)    
        
        recommendation = Recommendation.objects.create(
            advisor= request.user,
            investor= investor,
            message= message,
        )

        serialize =  RecommendationSerializer(recommendation)
        return Response(serialize.data, status=status.HTTP_201_CREATED)


# Investors view reco 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_recommendations(request):
    recommendations = Recommendation.objects.filter(investor=request.user)
    serializer = RecommendationSerializer(recommendations, many=True)
    return Response(serializer.data)


