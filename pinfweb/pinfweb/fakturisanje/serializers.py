from rest_framework import serializers
from fakturisanje.models import *

class CenovnikSerializer(serializers.ModelSerializer):
    id_preduzeca = serializers.PrimaryKeyRelatedField(  queryset = Preduzece.objects.all() )
    class Meta:
        model = Cenovnik
        fields = '__all__'
        depth = 1


class FakturaSerializer(serializers.ModelSerializer):
    id_narudzbenice = serializers.PrimaryKeyRelatedField(  queryset = Narudzbenica.objects.all() , required = False)
    id_poslovnog_partnera = serializers.PrimaryKeyRelatedField(  queryset = PoslovniPartner.objects.all() )
    id_preduzeca = serializers.PrimaryKeyRelatedField(  queryset = Preduzece.objects.all() )
    id_godine = serializers.PrimaryKeyRelatedField(  queryset = PoslovnaGodina.objects.all() )
    class Meta:
        model = Faktura
        fields = '__all__'
        depth = 1


class GrupaProizvodaSerializer(serializers.ModelSerializer):
    id_pdv_a = serializers.PrimaryKeyRelatedField(  queryset = Pdv.objects.all() )
    class Meta:
        model = GrupaProizvoda
        fields = '__all__'
        depth = 1


class JedinicaMereSerializer(serializers.ModelSerializer):
    class Meta:
        model = JedinicaMere
        fields = '__all__'
        depth = 1


class NarudzbenicaSerializer(serializers.ModelSerializer):
    id_poslovnog_partnera = serializers.PrimaryKeyRelatedField(  queryset = PoslovniPartner.objects.all() )
    class Meta:
        model = Narudzbenica
        fields = '__all__'
        depth = 1


class PdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pdv
        fields = '__all__'
        depth = 1


class PoslovnaGodinaSerializer(serializers.ModelSerializer):
    id_preduzeca = serializers.PrimaryKeyRelatedField(  queryset = Preduzece.objects.all() )
    class Meta:
        model = PoslovnaGodina
        fields = '__all__'
        depth = 1


class PoslovniPartnerSerializer(serializers.ModelSerializer):
    id_preduzeca = serializers.PrimaryKeyRelatedField(  queryset = Preduzece.objects.all() )
    class Meta:
        model = PoslovniPartner
        fields = '__all__'
        depth = 1


class PreduzeceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preduzece
        fields = '__all__'
        depth = 1


class ProizvodSerializer(serializers.ModelSerializer):
    id_preduzeca = serializers.PrimaryKeyRelatedField(  queryset = Preduzece.objects.all() )
    id_jedinice = serializers.PrimaryKeyRelatedField(  queryset = JedinicaMere.objects.all() )
    id_grupe = serializers.PrimaryKeyRelatedField(  queryset = GrupaProizvoda.objects.all() )
    class Meta:
        model = Proizvod
        fields = '__all__'
        depth = 1


class StavkaNarudzbeniceSerializer(serializers.ModelSerializer):
    id_narudzbenice = serializers.PrimaryKeyRelatedField(  queryset = Narudzbenica.objects.all() )
    class Meta:
        model = StavkaNarudzbenice
        fields = '__all__'
        depth = 1


class StavkeCenovnikaSerializer(serializers.ModelSerializer):
    id_cenovnika = serializers.PrimaryKeyRelatedField(  queryset = Cenovnik.objects.all() )
    id_proizvoda = serializers.PrimaryKeyRelatedField(  queryset = Proizvod.objects.all() )
    class Meta:
        model = StavkeCenovnika
        fields = '__all__'
        depth = 1


class StavkeFaktureSerializer(serializers.ModelSerializer):
    id_proizvoda = serializers.PrimaryKeyRelatedField(  queryset = Proizvod.objects.all() )
    id_fakture = serializers.PrimaryKeyRelatedField(  queryset = Faktura.objects.all() )
    class Meta:
        model = StavkeFakture
        fields = '__all__'
        depth = 1


class StopaPdvASerializer(serializers.ModelSerializer):
    id_pdv_a = serializers.PrimaryKeyRelatedField(  queryset = Pdv.objects.all() )
    class Meta:
        model = StopaPdvA
        fields = '__all__'
        depth = 1


