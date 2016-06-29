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
import datetime
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


        #super(StavkeFakture, self).save(*args, **kwargs) # Call the "real" save() method.



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

    datum = datetime.date.today()
    ukupno_bez_pdva = 0
    ukupan_pdv = 0
    ukupno_za_uplatu = 0
    try:
        with transaction.atomic():
            f = Faktura( broj_fakture = parameters['broj_fakture'], id_poslovnog_partnera = PoslovniPartner.objects.get(id_poslovnog_partnera = parameters['id_poslovnog_partnera']),
                         datum_valute = parameters['datum_valute'][:10], datum_fakture = datum, id_godine = PoslovnaGodina.objects.get( id_godine = parameters['id_godine']),
                         id_preduzeca = Preduzece.objects.get( id_preduzeca = parameters['id_preduzeca']), status = 'U izradi')
            f.save()
            vazeci_cen = get_vazeci_cenovnik(parameters['id_preduzeca'])
            for stavka in parameters['proizvodi']:


                pdv_stopa_stavke = get_stopu_pdv_za_proizvod(stavka['id_proizvoda'])
                s_jcena = float(StavkeCenovnika.objects.get( id_proizvoda = stavka['id_proizvoda'], id_cenovnika = vazeci_cen.id_cenovnika).cena)
                rabat = float(StavkeCenovnika.objects.get( id_proizvoda = stavka['id_proizvoda'], id_cenovnika = vazeci_cen.id_cenovnika).rabat)
                s_jcena_prodajna = s_jcena + rabat
                s_osn = s_jcena_prodajna * float(stavka['kolicina'])
                s_izpdv = float(pdv_stopa_stavke) * s_osn
                s_ukupanizn = s_osn + s_izpdv

                ukupno_bez_pdva = ukupno_bez_pdva + float(s_osn)
                ukupan_pdv = ukupan_pdv + float(s_izpdv)
                s = StavkeFakture( stopa_pdv_a = pdv_stopa_stavke, iznos_pdv_a = s_izpdv,
                                   osnovica = s_osn ,ukupan_iznos = s_ukupanizn,
                                    id_proizvoda = Proizvod.objects.get(id_proizvoda = stavka['id_proizvoda']), rabat = rabat,  id_fakture = f, jedinicna_cena = s_jcena, kolicina = stavka['kolicina'] )
                s.save()
            ukupno_za_uplatu = ukupno_bez_pdva + ukupan_pdv
            f.ukupan_iznos_bez_pdv_a = ukupno_bez_pdva
            f.ukupan_pdv = ukupan_pdv
            f.ukupno_za_placanje = ukupno_za_uplatu
            f.save()

            return JsonResponse({'id_fakture': f.id_fakture})
           # return Response(nova_faktura, status = status.HTTP_200_OK)
            #response = JsonResponse({""})
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)

def get_stopu_pdv_za_proizvod(id_p):
    gp = Proizvod.objects.get( id_proizvoda = id_p ).id_grupe
    pdv = gp.id_pdv_a
    stopa = StopaPdvA.objects.get( id_pdv_a = pdv)
    return float(stopa.stopa) / 100

def get_vazeci_cenovnik(id_p):
    pred = Preduzece.objects.get(id_preduzeca = id_p)
    obj= Cenovnik.objects.filter( id_preduzeca = pred.id_preduzeca ).order_by('-datum_vazena')[0]
    return obj


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

            vazeci_cen = get_vazeci_cenovnik(parameters['id_preduzeca'])
            for proizvod in parameters['proizvodi']:
                pdv_stopa_stavke = get_stopu_pdv_za_proizvod(proizvod['id_proizvoda'])

                s_jcena = float(StavkeCenovnika.objects.get( id_proizvoda = proizvod['id_proizvoda'], id_cenovnika = vazeci_cen.id_cenovnika).cena)
                #s_jcena_prodajna = s_jcena + float(proizvod['rabat'])
                s_osn = s_jcena * float(proizvod['kolicina'])
                s_izpdv = float(pdv_stopa_stavke) * s_osn
                s_ukupanizn = s_osn + s_izpdv

                s = StavkaNarudzbenice(ukupan_iznos = s_ukupanizn, iznos_pdv_a = s_izpdv, osnovica = s_osn, stopa_pdv_a = pdv_stopa_stavke, jedinicna_cena = s_jcena, id_narudzbenice = n, id_proizvoda = Proizvod.objects.get( id_proizvoda = proizvod['id_proizvoda']), kolicina = proizvod['kolicina'])
                s.save()
        #    nova_faktura = {'id_nove_fakture': f.id_fakture}
            return JsonResponse({"id_narudzbenice":n.id_narudzbenice})
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)


@csrf_exempt
def faktura_na_osnovu_narudzbenice(request):
    parameters = json.loads(request.body)
    n = Narudzbenica.objects.get(id_narudzbenice = parameters['id_narudzbenice'])

    try:
        with transaction.atomic():
            f = Faktura(id_narudzbenice = n, id_poslovnog_partnera = n.id_poslovnog_partnera,
                             id_preduzeca = n.id_preduzeca, id_godine = 1, status = 'U izradi') #ovo obaveznoooo menjati!!!!!
            f.save()
            stavke_n = StavkaNarudzbenice.objects.filter( id_narudzbenice = f.id_narudzbenice )
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
                np = StavkeCenovnika( rabat = p['rabat'], cena = p['cena'], id_cenovnika = c, id_proizvoda = Proizvod.objects.get(id_proizvoda = p['id_proizvoda']))
                np.save()
            return JsonResponse({"id_cenovnika":c.id_cenovnika})
    except:
       #handle_exception()
        return Response(status = status.HTTP_417_EXPECTATION_FAILED)
