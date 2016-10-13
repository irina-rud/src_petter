from django.shortcuts import render

from rest_framework import viewsets

from message.models import Message
from message.serializers import MessageSerializer
from rest_framework import permissions


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
