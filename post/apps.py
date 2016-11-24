from __future__ import unicode_literals

from django.apps import AppConfig


class PostConfig(AppConfig):
    name = 'post'

    def ready(self):
        from post.signals import init_signal
        init_signal()

