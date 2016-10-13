from django.shortcuts import render
from rest_framework import viewsets

from tag.models import Tag
from tag.serializers import TagSerializer


class TegViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
