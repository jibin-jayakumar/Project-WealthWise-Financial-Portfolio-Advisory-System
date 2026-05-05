# views.py (CORRECT for React + Django REST)
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, AdvisorRegistrationSerializer
from rest_framework.authtoken.models import Token 
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Profile, AdvisorDetail 


@api_view(['POST'])
@permission_classes([AllowAny])
def register_investor(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Investor registered successfully',
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def register_advisor(request):
    serializer = AdvisorRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Advisor registered successfully',
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    print(request.data,("debugg"))
    if user:
        token, _ = Token.objects.get_or_create(user=user)

        # Getting user type
        user_type = 'investor'
        if hasattr(user, 'profile'):
            user_type = user.profile.user_type

       
        return Response({
            'success': True,
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'user_type': user_type,
        })
    else:
        return Response({
            'success': False,
            'error': 'Invalid username or password'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.profile

    data={
        'id': user.id,
        'username':user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'age': profile.age,
        'phone_number': profile.phone_number,
        'user_type': profile.user_type,
    }

    if profile.user_type == 'advisor' and hasattr(user, 'advisor_detail'):
        advisor = user.advisor_detail
        data['expertise'] = advisor.expertise
        data['years_of_experience'] = advisor.years_of_experience
        data['bio'] = advisor.bio
        data['qualification'] = advisor.qualification

    return Response(data)    