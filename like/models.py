# coding: utf-8
from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.contrib.auth.models import User


class Like(models.Model):
    author = models.ForeignKey(User, related_name='like', verbose_name=u'Лайк')
    date_created = models.DateTimeField(verbose_name=u'Дата появления заявки', auto_now_add=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')

    def rate(self):
        return self.likes.count()
