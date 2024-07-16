import json
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
from channels.generic.websocket import (
    WebsocketConsumer, AsyncWebsocketConsumer
)



class OnlineConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        print(self.user)
        if self.user.is_authenticated:
            print("connected user")
            await self.add_user()
            await self.channel_layer.group_add("online_users", self.channel_name)
            await self.accept()
            await self.send_online_users()

    async def disconnect(self, close_code):
        if self.user.is_authenticated:
            await self.remove_user()
            await self.channel_layer.group_discard("online_users", self.channel_name)

    async def receive(self, text_data):
        pass

    async def send_online_users(self):
        online_users = await self.get_online_users()
        print(online_users)
        await self.channel_layer.group_send(
            "online_users",
            {
                "type": "online.users",
                "users": online_users,
            },
        )

    async def online_users(self, event):
        await self.send(text_data=json.dumps({
            "type": "online_users",
            "users": event["users"],
        }))

    @database_sync_to_async
    def add_user(self):
        from activity.models import Active
        user, _ = Active.objects.get_or_create(user=self.user)
        user.is_online = True
        user.save()
        return user

    @database_sync_to_async
    def remove_user(self):

        from activity.models import Active
        return Active.objects.filter(id=self.user.id).update(is_online=False)

    @database_sync_to_async
    def get_online_users(self):
        from activity.models import Active
        return [i.user.username for i in Active.objects.filter(is_online=True)]


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.user = self.scope["url_route"]["kwargs"]
        self.room_group_name = "chat_%s" % self.room_name
        self.user = self.scope['user']

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        token = text_data_json["token"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "message": message, "token": token}
        )

    # Receive message from room group
    def chat_message(self, event):
        token = event["token"]
        from rest_framework_simplejwt.tokens import UntypedToken
        import jwt
        from django.contrib.auth.models import User
        UntypedToken(token)
        decoded_data = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded_data["user_id"]
        user = User.objects.get(id=user_id)
        message = user.username+': '+event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))