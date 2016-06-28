from django.conf.urls import url, include
from fakturisanje import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'cenovnik', views.CenovnikViewSet)
router.register(r'faktura', views.FakturaViewSet)
router.register(r'grupaproizvoda', views.GrupaProizvodaViewSet)
router.register(r'jedinicamere', views.JedinicaMereViewSet)
router.register(r'narudzbenica', views.NarudzbenicaViewSet)
router.register(r'pdv', views.PdvViewSet)
router.register(r'poslovnagodina', views.PoslovnaGodinaViewSet)
router.register(r'poslovnipartner', views.PoslovniPartnerViewSet)
router.register(r'preduzece', views.PreduzeceViewSet)
router.register(r'proizvod', views.ProizvodViewSet)
router.register(r'stavkanarudzbenice', views.StavkaNarudzbeniceViewSet)
router.register(r'stavkecenovnika', views.StavkeCenovnikaViewSet)
router.register(r'stavkefakture', views.StavkeFaktureViewSet)
router.register(r'stopapdva', views.StopaPdvAViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^kopirajcenovnik', 'fakturisanje.views.kopiraj_cenovnik'),
    url(r'^fakturisanje/rucno', 'fakturisanje.views.fakturisanje_rucno'),
    url(r'^faktura/xmlexport/(?P<id_fakture>\d+)', 'fakturisanje.views.faktura_xml_export')
]