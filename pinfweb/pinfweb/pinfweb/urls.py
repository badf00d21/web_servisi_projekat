from django.conf.urls import url, include
from pinfwebakturisanje import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]