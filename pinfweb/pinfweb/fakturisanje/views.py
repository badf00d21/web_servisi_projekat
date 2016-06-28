from fakturisanje.serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets

class CenovnikViewSet(viewsets.ModelViewSet):
    queryset = Cenovnik.objects.all()
    serializer_class = CenovnikSerializer


class FakturaViewSet(viewsets.ModelViewSet):
    queryset = Faktura.objects.all()
    serializer_class = FakturaSerializer


class GrupaProizvodaViewSet(viewsets.ModelViewSet):
    queryset = GrupaProizvoda.objects.all()
    serializer_class = GrupaProizvodaSerializer


class JedinicaMereViewSet(viewsets.ModelViewSet):
    queryset = JedinicaMere.objects.all()
    serializer_class = JedinicaMereSerializer


class NarudzbenicaViewSet(viewsets.ModelViewSet):
    queryset = Narudzbenica.objects.all()
    serializer_class = NarudzbenicaSerializer


class PdvViewSet(viewsets.ModelViewSet):
    queryset = Pdv.objects.all()
    serializer_class = PdvSerializer


class PoslovnaGodinaViewSet(viewsets.ModelViewSet):
    queryset = PoslovnaGodina.objects.all()
    serializer_class = PoslovnaGodinaSerializer


class PoslovniPartnerViewSet(viewsets.ModelViewSet):
    queryset = PoslovniPartner.objects.all()
    serializer_class = PoslovniPartnerSerializer


class PreduzeceViewSet(viewsets.ModelViewSet):
    queryset = Preduzece.objects.all()
    serializer_class = PreduzeceSerializer


class ProizvodViewSet(viewsets.ModelViewSet):
    queryset = Proizvod.objects.all()
    serializer_class = ProizvodSerializer


class StavkaNarudzbeniceViewSet(viewsets.ModelViewSet):
    queryset = StavkaNarudzbenice.objects.all()
    serializer_class = StavkaNarudzbeniceSerializer


class StavkeCenovnikaViewSet(viewsets.ModelViewSet):
    queryset = StavkeCenovnika.objects.all()
    serializer_class = StavkeCenovnikaSerializer


class StavkeFaktureViewSet(viewsets.ModelViewSet):
    queryset = StavkeFakture.objects.all()
    serializer_class = StavkeFaktureSerializer


class StopaPdvAViewSet(viewsets.ModelViewSet):
    queryset = StopaPdvA.objects.all()
    serializer_class = StopaPdvASerializer


@api_view(['GET'])
def api_root(request, format = None):
    return Response({
'cenovnik': reverse('cenovnik-list', request = request, format = format),
'faktura': reverse('faktura-list', request = request, format = format),
'grupaproizvoda': reverse('grupaproizvoda-list', request = request, format = format),
'jedinicamere': reverse('jedinicamere-list', request = request, format = format),
'narudzbenica': reverse('narudzbenica-list', request = request, format = format),
'pdv': reverse('pdv-list', request = request, format = format),
'poslovnagodina': reverse('poslovnagodina-list', request = request, format = format),
'poslovnipartner': reverse('poslovnipartner-list', request = request, format = format),
'preduzece': reverse('preduzece-list', request = request, format = format),
'proizvod': reverse('proizvod-list', request = request, format = format),
'stavkanarudzbenice': reverse('stavkanarudzbenice-list', request = request, format = format),
'stavkecenovnika': reverse('stavkecenovnika-list', request = request, format = format),
'stavkefakture': reverse('stavkefakture-list', request = request, format = format),
'stopapdva': reverse('stopapdva-list', request = request, format = format),
})


