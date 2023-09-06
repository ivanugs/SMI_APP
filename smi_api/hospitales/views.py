from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from hospitales.models import Hospital
from hospitales.serializers import HospitalSerializer
# Create your views here.


class HospitalViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Hospital.objects.all().order_by("nombre_de_la_unidad")
    serializer_class = HospitalSerializer
    pagination_class = PageNumberPagination

