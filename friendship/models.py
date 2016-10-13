# coding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.db import models


class Friendship(models.Model):
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'Инициатор заявки', related_name='requesters')
    replier = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'Отвечающий на заявку', related_name='repliers')
    date_created = models.DateTimeField(verbose_name=u'Дата появления заявки', auto_now_add=True)
    date_replied = models.DateTimeField(verbose_name=u'Дата одобрения заявки', null=True, blank=True)
    is_accepted = models.BooleanField(verbose_name=u'Одобрение', default=False)
