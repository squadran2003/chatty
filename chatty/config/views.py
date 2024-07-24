from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework import status
from django.shortcuts import render
from django.contrib.auth.models import User
from django.conf import settings
from django.http import JsonResponse


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def room(request, room_name):
    return Response({"room_name": room_name})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def users(request, online_users):
    print("online_users", online_users)
    return Response({"users": online_users})


def index(request):
    return render(request, 'index.html')


class GoogleLogin(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        token = request.data.get('token')

        if not token:
            return Response({'error': 'ID token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            id_info = id_token.verify_oauth2_token(token, requests.Request())
            # logger.debug(f"ID Token info: {id_info}")
        except ValueError as e:
            # logger.error(f"Token verification failed: {e}")
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        email = id_info.get('email')
        user, created = User.objects.get_or_create(username=email, email=email)
        if created:
            user.set_unusable_password()
            user.save()
        refresh = RefreshToken.for_user(user)
        # now get a jwt tpoken
        return Response(
            {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK
        )


def get_google_client_id(request):
    return JsonResponse({'googleClientId': settings.GOOGLE_CLIENT_ID})
