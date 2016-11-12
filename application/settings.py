"""
Django settings for application project.

Generated by 'django-admin startproject' using Django 1.10.1.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '26)9n&-^@t@*ciau$d*1@++@7blbkfhf!e9mkj1pcqy&-oro%j'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['petterpet.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework',
    # 'django.contrib.gis',
    'core',
    'like',
    'chat',
    'post',
    'pet',
    'message',
    'friendship',
    'tag',
    'social.apps.django_app.default',
    'oauth2_provider',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True

AUTHENTICATION_BACKENDS = (
    #'social_auth.backends.contrib.vkontakte.VKontakteOAuth2Backend',
    #'social_auth.backends.facebook.FacebookBackend',
    #'social_auth.backends.google.GoogleOAuth2Backend',
    #'social_auth.backends.twitter.TwitterBackend',
    #'social_auth.backends.contrib.yandex.YandexOAuth2Backend',
    #'social_auth.backends.contrib.mailru.MailruBackend',
    #'social_auth.backends.contrib.odnoklassniki.OdnoklassnikiBackend',
    #'django.contrib.auth.backends.ModelBackend',
   #'social_auth.backends.contrib.vk.VKOAuth2Backend',
    #'social.backends.vk.VKOAuth2',
    'social.backends.vk.VKOAuth2',
    'social.backends.facebook.FacebookOAuth2',
    #'social.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)
VK_APP_ID = '5666923'
VK_API_SECRET = 'MINkdpCZ5shnPBfr7wRO'

SOCIAL_AUTH_VK_OAUTH2_SCOPE = ['email', ]
SOCIAL_AUTH_VK_OAUTH2_EXTRA_DATA = ['email', ]
SOCIAL_AUTH_VK_OAUTH2_KEY = '5666923'
SOCIAL_AUTH_VK_OAUTH2_SECRET = 'MINkdpCZ5shnPBfr7wRO'

SOCIAL_AUTH_FACEBOOK_SCOPE = ['email', ]
SOCIAL_AUTH_FACEBOOK_EXTRA_DATA = ['email', ]
SOCIAL_AUTH_FACEBOOK_KEY = ''
SOCIAL_AUTH_FACEBOOK_SECRET = ''

SOCIAL_AUTH_USERNAME_IS_FULL_EMAIL = True
SOCIAL_AUTH_SANITIZE_REDIRECTS = False

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/'

OAUTH2_PROVIDER_APPLICATION_MODEL = 'oauth2_provider.Application'

TEMPLATE_CONTEXT_PROCESSORS = (
    'social.apps.django_app.context_processors.backends',
    'social.apps.django_app.context_processors.login_redirect',
)

ROOT_URLCONF = 'application.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'application.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'petter_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
	'PORT': '',
    },
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/
# <a target="_blank" href="https: docs.djangoproject.com="" en="" 1.8="" howto="" static-files="" "="">https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/home/kymid/src_petter/collected_static/'
STATICFILES_DIRS = ('/home/kymid/src_petter/static/', )

try:
    from local_settings import *
except ImportError:
    pass

