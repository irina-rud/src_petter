from rest_framework import serializers

from models import Like


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('likes', 'dislikes')

