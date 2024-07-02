from django.db import models


class Active(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    is_online = models.BooleanField(default=True)
    last_active = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user)
