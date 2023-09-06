from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from hospitales.models import Servicio
from hospitales.serializers import ServicioSerializer
# Create your views here.

class ServicioViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    pagination_class = PageNumberPagination
