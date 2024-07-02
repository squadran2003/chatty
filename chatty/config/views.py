from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render


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