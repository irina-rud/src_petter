from rest_framework import serializers

from models import Post


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('author', 'date_created', 'text', 'title')
