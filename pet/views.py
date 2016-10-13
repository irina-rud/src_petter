from django.shortcuts import render
from rest_framework import viewsets

from pet.models import Pet
from pet.permissions import IsOwnerOrReadOnly
from pet.serializers import PetSerializer
from post import permissions


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)