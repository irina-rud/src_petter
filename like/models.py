# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Like(models.Model):
    likes = models.ManyToManyField(User, related_name='like', verbose_name=u'Лайк')
    dislikes = models.ManyToManyField(User, related_name='dislike', verbose_name=u'Дислайк')

    def rate(self):
        return self.likes.count() - self.dislikes.count()
