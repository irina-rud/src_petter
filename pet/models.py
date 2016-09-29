# coding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.db import models


class Pet(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'Хозяин', related_name='pets')
    date_created = models.DateTimeField(verbose_name=u'Дата появления', auto_now_add=True)
    birthday = models.DateTimeField(verbose_name=u'Дата рождения', auto_now_add=False)
    name = models.CharField(verbose_name=u'Имя', max_length=140)
    species = models.TextField(verbose_name=u'Вид')
    avatar = models.ImageField(verbose_name=u'Фотография')

    def __unicode__(self):
        return self.title

        class Meta:
            verbose_name = u'Питомец'
            verbose_name_plural = u'Питомцы'
            ordering = ('-name',)
