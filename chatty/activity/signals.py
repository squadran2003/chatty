from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver

from .models import Active


@receiver(user_logged_in)
def user_logged_in_handler(sender, request, user, **kwargs):
    Active.objects.get_or_create(user=user)


@receiver(user_logged_out)
def user_logged_out_handler(sender, request, user, **kwargs):
    Active.objects.filter(user=user).delete()