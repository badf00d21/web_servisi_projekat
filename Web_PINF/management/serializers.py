__author__ = 'Pex'
from rest_framework import serializers
from models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class CenovnikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cenovnik
        fields = '__all__'

class FakturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faktura
        fields = '__all__'

class GrupaProizvodaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupaProizvoda
        fields = '__all__'

class JedinicaMereSerializer(serializers.ModelSerializer):
    class Meta:
        model = JedinicaMere
        fields = '__all__'

class PdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pdv
        fields = '__all__'

class PoslovnaGodinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoslovnaGodina
        fields = '__all__'

class PoslovniPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoslovniPartner
        fields = '__all__'

class PreduzeceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preduzece
        fields = '__all__'

class ProizvodSerializer(serializers.ModelSerializer):
    idpreduzeca = serializers.PrimaryKeyRelatedField(queryset=Preduzece.objects.all())
    id_jedinice = serializers.PrimaryKeyRelatedField(queryset=JedinicaMere.objects.all())
    id_grupe = serializers.PrimaryKeyRelatedField(queryset=GrupaProizvoda.objects.all(), required=False)
    class Meta:
        model = Proizvod
        fields ='__all__'
        depth = 1



class StavkeCenovnikaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StavkeCenovnika
        fields = '__all__'

class StavkeFaktureSerializer(serializers.ModelSerializer):
    class Meta:
        model = StavkeFakture
        fields = '__all__'

class StopaPdvASerializer(serializers.ModelSerializer):
    class Meta:
        model = StopaPdvA
        fields = '__all__'

