from .settings import *
import boto3
from botocore.exceptions import ClientError
import json

DEBUG = False


ALLOWED_HOSTS = ["chattymusic.com", "172.18.0.3", ]

CSRF_TRUSTED_ORIGINS = [
    'https://chattymusic.com',
    'http://chattymusic.com',
]
print(ALLOWED_HOSTS)
print(CSRF_TRUSTED_ORIGINS)

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'


def get_secrets():

    secret_name = "andy-chat-server-secrets"
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    secrets = get_secret_value_response['SecretString']
    return json.loads(secrets)


SECRETS = get_secrets()


SECRET_KEY = SECRETS['SECRET_KEY']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': SECRETS["DB_NAME"],
        'USER': SECRETS["DB_USER"],
        'PASSWORD': SECRETS["DB_PASSWORD"],
        'HOST': SECRETS["DB_HOST"],
        'PORT': '5432',
    }
}
AWS_ACCESS_KEY_ID = SECRETS['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = SECRETS['AWS_SECRET_ACCESS_KEY']
GOOGLE_CLIENT_ID = SECRETS['GOOGLE_CLIENT_ID']
# AWS_STORAGE_BUCKET_NAME = SECRETS['AWS_STORAGE_BUCKET_NAME']
# AWS_S3_CUSTOM_DOMAIN = "{}.s3.eu-west-2.amazonaws.com".format(AWS_STORAGE_BUCKET_NAME)
# # need a signature for kms
# AWS_S3_OBJECT_PARAMETERS = {
#     'CacheControl': 'max-age=86400',

# }
# AWS_LOCATION = 'static'
# STATIC_URL = "https://{}/{}/".format(AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
# MEDIA_URL = "https://{}/{}/".format(AWS_S3_CUSTOM_DOMAIN, 'media')
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'