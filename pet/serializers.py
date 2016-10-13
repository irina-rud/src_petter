from rest_framework import serializers

from models import Pet


class PetSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    
    class Meta:
        model = Pet
        fields = ('author', 'date_created', 'birthday', 'name', 'species', 'avatar')
