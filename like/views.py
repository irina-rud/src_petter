from django.shortcuts import render
from rest_framework import viewsets

from like.models import Like
from like.serializers import LikeSerializer


class LikeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
