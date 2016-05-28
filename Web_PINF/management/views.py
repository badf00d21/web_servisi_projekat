from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import renderers
from rest_framework.parsers import JSONParser
from management.models import *
from management.serializers import *
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from management.permissions import IsOwnerOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets
from rest_framework.decorators import detail_route


class ProizvodViewSet(viewsets.ModelViewSet):
    queryset = Proizvod.objects.all()
    serializer_class =ProizvodSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CenovnikViewSet(viewsets.ModelViewSet):
    queryset = Cenovnik.objects.all()
    serializer_class = CenovnikSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'proizvod': reverse('proizvod-list', request=request, format=format),
        'cenovnik': reverse('cenovnik-list', request=request, format=format)
    })
