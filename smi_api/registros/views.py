from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from registros.models import Registro, TipoRegistro
from pacientes.models import Paciente
from registros.serializers import RegistroSerializer
from rest_framework.decorators import action
from django.utils import timezone
from rest_framework.response import Response

import os
from dotenv import load_dotenv
load_dotenv()
import requests
import datetime

SMI_ARDUINO_PATH = os.getenv('SMI_ARDUINO_PATH', default="")

class RegistroViewSet(viewsets.ModelViewSet):

    lookup_field = "id"
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    pagination_class = PageNumberPagination
    
    @action(detail=False, methods=["get"])
    def send_register(self, request):
        mac = request.GET.get("mac")
        five_minutes_ago = timezone.now() + datetime.timedelta(minutes=-5)
        existe_registro = Registro.objects.filter(card=mac, created_at__gte=five_minutes_ago)
        if not existe_registro:
            tipo_registro = TipoRegistro.objects.get(nombre="lectura_paciente")
            registro = Registro.objects.create(card=mac, tipo_registro=tipo_registro)
            return Response({"Tarjeta registrada":mac})
        else:
            return Response({"Existe registro":mac})
        
    @action(detail=False, methods=["post"])
    def register_attendance(self, request):
        try:
            response = requests.get(f"{SMI_ARDUINO_PATH}/data",timeout=30)
            json_res = response.json()
            if response.status_code == 200:
                mac_tarjeta = json_res['data']
                paciente = Paciente.objects.filter(mac_tarjeta=mac_tarjeta).first()
                if paciente:
                    five_minutes_ago = timezone.now() + datetime.timedelta(minutes=-5)
                    existe_registro = Registro.objects.filter(card=mac_tarjeta, created_at__gte=five_minutes_ago)
                    tipo_registro = TipoRegistro.objects.get(nombre="lectura_paciente")
                    registro, created = Registro.objects.get_or_create(card=mac_tarjeta, tipo_registro=tipo_registro)
                    return Response({"message":"Registro Exitoso", "data": {
                        "paciente": f"{paciente.apellido_paterno} {paciente.apellido_materno} {paciente.nombres}",
                        "tarjeta": paciente.mac_tarjeta,
                        "hora": registro.created_at
                    }})
              
                else:
                    return Response({"No hay Tarjeta registrada": mac_tarjeta})
        except requests.exceptions.ReadTimeout: 
            pass
        
        return Response({"Error en el registro"})

