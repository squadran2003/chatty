from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def room(request, room_name):
    return Response({"room_name": room_name})