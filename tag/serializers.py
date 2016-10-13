from rest_framework import serializers

from tag.models import Tag


class TagSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Tag
        fields = ('name', )
