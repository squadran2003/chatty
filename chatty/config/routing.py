from django.urls import re_path

from config import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/chat/users/(?P<online_users>\w+)/$", consumers.OnlineConsumer.as_asgi()),
]