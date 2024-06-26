import jwt
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from channels.auth import AuthMiddlewareStack
from django.db import close_old_connections
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()

        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token", [None])[0]
        from django.contrib.auth.models import AnonymousUser
        scope["user"] = AnonymousUser()
        if token:
            try:
                from rest_framework_simplejwt.tokens import UntypedToken
                UntypedToken(token)
                decoded_data = jwt.decode(token, options={"verify_signature": False})
                user_id = decoded_data["user_id"]
                scope["user"] = await self.get_user(user_id)
            except (InvalidToken, TokenError, jwt.DecodeError):
                pass

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user(self, user_id):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            from django.contrib.auth.models import AnonymousUser
            return AnonymousUser()


def JWTAuthMiddlewareStack(inner):
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))
