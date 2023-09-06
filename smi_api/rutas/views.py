from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rutas.models import Ruta
from rutas.serializers import RutaSerializer
# Create your views here.


class RutaViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer
    pagination_class = PageNumberPagination

