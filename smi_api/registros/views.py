from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from registros.models import Registro, TipoRegistro
from pacientes.models import Paciente
from registros.serializers import RegistroSerializer
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.response import Response

from dotenv import load_dotenv
load_dotenv()


class RegistroViewSet(viewsets.ModelViewSet):

    lookup_field = "id"
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    pagination_class = PageNumberPagination
    
    @action(detail=False, methods=["get"])
    def send_register(self, request):
        import datetime
        mac = request.GET.get("mac")
        print(mac)
        five_minutes_ago = timezone.now() + datetime.timedelta(minutes=-5)
        existe_registro = Registro.objects.filter(card=mac, created_at__gte=five_minutes_ago)
        if not existe_registro:
            tipo_registro = TipoRegistro.objects.get(nombre="lectura_paciente")
            registro = Registro.objects.create(card=mac, tipo_registro=tipo_registro)
            return Response({"Tarjeta registrada":mac})
        else:
            return Response({"Existe registro":mac})
        
    @action(detail=False, methods=["get"])
    def register_card(self, request):
        patient_uuid = request.GET.get("patient_uuid")
        existe_paciente = Paciente.objects.filter(uuid=patient_uuid).first()
        if not existe_paciente:

            return Response({"No Existe Paciente":patient_uuid})
        else:
            return Response({"Existe Paciente":patient_uuid})

