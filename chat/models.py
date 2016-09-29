# coding: utf-8

from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Chat(models.Model):
    name = models.CharField(verbose_name=u'Имя', max_length=140)


    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = u'Чат'
        verbose_name_plural = u'Чаты'
        ordering = ('-name',)