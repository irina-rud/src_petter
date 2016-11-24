from rest_framework import serializers

from models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Post
        fields = ('author', 'date_created', 'text', 'title', 'author_name')
