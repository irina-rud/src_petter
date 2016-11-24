from django.db.models.signals import post_save
from like.models import Like


def like_post_save(sender, **kwargs):
    if kwargs.get('created'):
        print(kwargs.get('instance'))


post_save.connect(like_post_save, Like)
