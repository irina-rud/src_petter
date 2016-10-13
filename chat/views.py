from django.shortcuts import render
from rest_framework import viewsets

from chat.models import Chat, Message
from chat.serializers import ChatSerializer, MessageSerializer
from rest_framework import permissions


class ChatViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        qs = super(self).get_queryset()
        if self.request.query_params.get('chat'):
            qs = qs.filter(chat__id=self.request.query_params.get('chat'))
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
