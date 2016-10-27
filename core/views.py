from django.shortcuts import render
from django.http import HttpResponse

from post.models import Post

from django.contrib.auth.models import User, Group
from rest_framework import viewsets

from core.models import Profile
from core.serializers import UserSerializer, GroupSerializer, ProfileSerializer, PostSerializer

def feed(request):
    return render(request, 'nav/feed.html', {
        'post_list': Post.objects.all(),
    })


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-date_created')
    serializer_class = PostSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
