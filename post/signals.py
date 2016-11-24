# coding=utf-8
from django.db.models.signals import post_save

from post.models import Comment, Post
from post.tasks import send_email_notification


def on_comment_creation(sender, instance, *args, **kwargs):
    print u"Доброе утро"
    if kwargs.get('created'):
        to = instance.refer_to.author.email
        if to:
            comment = instance
            send_email_notification.apply_async(
                args=[
                    to,
                    'New comment to post "{}"'.format(comment.refer_to.title),
                    'You got comment with the text: "{}"'.format(comment.text)
                ]
            )


def init_signal():
    post_save.connect(on_comment_creation, sender=Comment)
