from rest_framework import serializers

from models import Message


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('author', 'date_created', 'text', 'chat')
