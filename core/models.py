# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from django.conf import settings

from django.contrib.auth.models import User


class Profile(models.Model):
    avatar = models.ImageField(null=True, upload_to='avatars')
    user = models.OneToOneField(User)

    def __unicode__(self):
        return self.user.username

    class Meta:
        verbose_name = u'Пользователь'
        verbose_name_plural = u'Пользователи'

