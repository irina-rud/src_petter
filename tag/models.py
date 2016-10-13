# coding: utf-8
from __future__ import unicode_literals

from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=25, unique=True)

    class Meta:
        verbose_name = u'Тэг'
        verbose_name_plural = u'Тэги'

    def __str__(self):
        return "[" + str(self.id) + "] " + self.name

    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('posts:tag', args=[str(self.name)])

    def __unicode__(self):
        return self.name
