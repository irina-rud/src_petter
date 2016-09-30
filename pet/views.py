from django.shortcuts import render
from rest_framework import viewsets

from pet.models import Pet
from pet.serializers import PetSerializer


class PetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
