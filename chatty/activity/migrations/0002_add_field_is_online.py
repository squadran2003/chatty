# Generated by Django 5.0.6 on 2024-07-01 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0001_create_active_model'),
    ]

    operations = [
        migrations.AddField(
            model_name='active',
            name='is_online',
            field=models.BooleanField(default=True),
        ),
    ]