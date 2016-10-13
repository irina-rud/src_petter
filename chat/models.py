# coding: utf-8

from __future__ import unicode_literals

from django.db import models

# Create your models here.
from message.models import Message


class Chat(models.Model):
    name = models.CharField(verbose_name=u'Имя', max_length=140)
    date_created = models.DateTimeField(verbose_name=u'Дата создания', auto_now_add=True)
    date_last_message = models.DateTimeField(verbose_name=u'Дата последнего сообщения', auto_now_add=True)

    # надо научиться менять это из сообщения

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = u'Чат'
        verbose_name_plural = u'Чаты'
        ordering = ('-date_last_message',)
