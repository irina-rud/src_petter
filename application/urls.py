"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from django.conf.urls import url, include
from rest_framework import routers
from core import views

from rest_framework import permissions, routers, serializers, viewsets
from django.contrib.auth.models import User, Group
from django.views.generic import TemplateView
from post.views import Post
from post.views import PostViewSet
from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group

class PostSerializer(serializers.ModelSerializer):
    def validate_author(self, data):
        return True

    class Meta:
        model = Post
        read_only_fields = ('author', )

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class PostViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'profiles', views.ProfileViewSet)
router.register(r'posts', PostViewSet)


from django.contrib.auth.views import logout, login
from core import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^router/', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^feed/', views.feed),
    url(r'^logout/', logout, name="logout"),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    #url(r'', include('social.apps.django_app.urls', namespace='social')),
    url(r'^auth/$', login, {'template_name': 'login.html'}, name="auth"),
    url(r'^social/', include('social.apps.django_app.urls', namespace='social')),
    url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]


