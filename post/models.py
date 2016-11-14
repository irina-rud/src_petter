# coding: utf-8
from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

# from django.contrib.gis.db import models
from pet.models import Pet

class UserFullName(User):
    class Meta:
        proxy = True

    def __unicode__(self):
        return self.get_username()

class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'Автор', related_name='posts')
    #author_name = UserFullName(author)
    date_created = models.DateTimeField(verbose_name=u'Дата публикации', auto_now_add=True)
    title = models.CharField(verbose_name=u'Заголовок', max_length=140)
    text = models.TextField(verbose_name=u'Текст')
    #picture = models.ImageField(null=True)
    #last_changes = models.DateTimeField(auto_now=True, verbose_name=u'Время последнего редактирования')
    #pet = models.ManyToManyField(Pet, verbose_name=u'Идентификатор животного')
    #location_latitude = models.FloatField(verbose_name=u'Широта', default='-1')
    #location_longitude = models.FloatField(verbose_name=u'Долгота', default='-1')

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = u'Пост'
        verbose_name_plural = u'Посты'
        ordering = ('-date_created',)

    def get_cent_answers_channel_name(self):
        return "post_%d" % self.id
