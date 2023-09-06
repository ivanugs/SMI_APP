from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from pacientes.models import Paciente
from pacientes.serializers import PacienteSerializer
# Create your views here.


class PacienteViewset(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Paciente.objects.all().order_by("curp")
    serializer_class = PacienteSerializer
    pagination_class = PageNumberPagination

