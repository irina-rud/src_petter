from rest_framework import serializers

from models import Chat


class ChatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chat
        fields = ('name')
