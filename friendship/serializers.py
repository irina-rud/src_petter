from rest_framework import serializers

from models import Friendship


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friendship
        fields = ('requester', 'replier', 'text', 'title')
