from fakturisanje.serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from rest_framework.reverse import reverse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.db import  transaction
from django.http import JsonResponse
from reportlab.pdfgen import canvas
import json

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


@csrf_exempt
def kopiraj_cenovnik(request):
    parameters = json.loads(request.body)
    cen = parameters['id_cen']
    percent = parameters['procenat']
    c  = Cenovnik.objects.get( id_cenovnika = cen )
    try:
        with transaction.atomic():
            c2 = Cenovnik( id_preduzeca = c.id_preduzeca, datum_vazena = c.datum_vazena)
            c2.save()

            stavke = StavkeCenovnika.objects.filter( id_cenovnika = c.id_cenovnika )
            for i in range (len(stavke)):
                StavkeCenovnika( id_proizvoda = stavke[i].id_proizvoda, id_cenovnika = c2, cena = float(stavke[i].cena) + float(stavke[i].cena) * float(percent) / float(100)).save()
            #return Response(status=status.HTTP_201_CREATED)
            response = JsonResponse({'id_cenovnika':str(c2.id_cenovnika)})
            return  response
    except:
        print 'nesto je poslo po zlu :('
        return Response(status=status.HTTP_417_EXPECTATION_FAILED)


@csrf_exempt
def fakturisanje_rucno(request):
    parameters = json.loads(request.body)

    try:
        with transaction.atomic():
            f = Faktura( broj_fakture = parameters['broj_fakture'], id_poslovnog_partnera = PoslovniPartner.objects.get(id_poslovnog_partnera = parameters['id_poslovnog_partnera']),
                         datum_valute = parameters['datum_valute'], datum_fakture = parameters['datum_fakture'], id_godine = PoslovnaGodina.objects.get( id_godine = parameters['id_godine']),
                         id_preduzeca = Preduzece.objects.get( id_preduzeca = parameters['id_preduzeca']), status = 'U izradi')
            f.save()
            for stavka in parameters['stavke_fakture']:
                s = StavkeFakture( id_proizvoda = Proizvod.objects.get( id_proizvoda = stavka['id_proizvoda']['id_proizvoda']), id_fakture = f, kolicina = stavka['kolicina'])
                s.save()
            nova_faktura = {'id_nove_fakture': f.id_fakture}
           # return Response(nova_faktura, status = status.HTTP_200_OK)
            #response = JsonResponse({""})
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)

def faktura_xml_export(request, id_fakture):
    f = Faktura.objects.get(id_fakture = id_fakture)

    serialized_obj = serializers.serialize('xml', [ f, ])

    return Response(serialized_obj)

@csrf_exempt
def kreiraj_narudzbenicu(request):
    parameters = json.loads(request.body)

    try:
        with transaction.atomic():
            n = Narudzbenica(id_poslovnog_partnera = PoslovniPartner.objects.get(id_poslovnog_partnera = parameters['id_poslovnog_partnera']),
                             id_preduzeca = Preduzece.objects.get(id_preduzeca = parameters['id_preduzeca']), rok_isporuke = parameters['rok_isporuke'], rok_placanja = parameters['rok_placanja'])
            n.save()
            for proizvod in parameters['proizvodi']:
                s = StavkaNarudzbenice( id_narudzbenice = n, id_proizvoda = Proizvod.objects.get( id_proizvoda = proizvod['id_proizvoda']), kolicina = proizvod['kolicina'])
                s.save()
        #    nova_faktura = {'id_nove_fakture': f.id_fakture}
            return Response( status = status.HTTP_200_OK)
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)


@csrf_exempt
def faktura_na_osnovu_narudzbenice(request):
    parameters = json.loads(request.body)
    n = Narudzbenica.objects.get(id_narudzbenice = parameters['id_narudzbenice'])

    try:
        with transaction.atomic():
            f = Faktura(id_poslovnog_partnera = n.id_poslovnog_partnera,
                             id_preduzeca = n.id_preduzeca, id_godine = 1, status = 'U izradi') #ovo obaveznoooo menjati!!!!!
            f.save()
            stavke_n = StavkaNarudzbenice.filter( id_narudzbenice = f.id_narudzbenice )
            for stavka in stavke_n:
                s = StavkeFakture( id_narudzbenice = n , rabat = stavka.rabat, jedinicna_cena = stavka.jedinicna_cena,
                                   stopa_pdv_a = stavka.stopa_pdv_a, osnovica = stavka.osnovica, iznos_pdv_a = stavka.iznos_pdv_a,
                                   ukupan_iznos = stavka.ukupan_iznos,
                                   id_proizvoda = Proizvod.objects.get( id_proizvoda = stavka.id_proizvoda), kolicina = stavka.kolicina)
                s.save()
        #    nova_faktura = {'id_nove_fakture': f.id_fakture}
            return Response( status = status.HTTP_200_OK)
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)


@csrf_exempt
def novi_cenovnik(request):
    parameters = json.loads(request.body)

    try:
        with transaction.atomic():
            c = Cenovnik( id_preduzeca = Preduzece.objects.get( id_preduzeca = parameters['id_preduzeca']), datum_vazena = parameters['datum_vazena'])
            c.save()

            for p in parameters['proizvodi']:
                np = StavkeCenovnika( cena = p['cena'], id_cenovnika = c, id_proizvoda = Proizvod.objects.get(id_proizvoda = p['id_proizvoda']))
                np.save()
            return JsonResponse({"id_cenovnika":c.id_cenovnika})
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)
