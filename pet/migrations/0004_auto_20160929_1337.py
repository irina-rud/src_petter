# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-29 13:37
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pet', '0003_auto_20160929_1335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pets', to=settings.AUTH_USER_MODEL, verbose_name='\u0425\u043e\u0437\u044f\u0438\u043d'),
        ),
    ]
