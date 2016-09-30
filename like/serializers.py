from rest_framework import serializers

from models import Like


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('author', 'date_created', 'content_type', 'object_id')
