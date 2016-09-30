from django.shortcuts import render

from rest_framework import viewsets

from post.models import Post
from post.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
