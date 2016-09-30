from django.shortcuts import render
from rest_framework import viewsets

from chat.models import Chat
from chat.serializers import ChatSerializer


class ChatViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
