from django.shortcuts import render

from rest_framework import viewsets

from message.models import Message
from message.serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
