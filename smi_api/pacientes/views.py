from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from pacientes.models import Paciente, PacienteTarjeta
from pacientes.serializers import PacienteSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
import os
from dotenv import load_dotenv
load_dotenv()
import requests
SMI_ARDUINO_PATH = os.getenv('SMI_ARDUINO_PATH', default="")

class PacienteViewset(viewsets.ModelViewSet):
    lookup_field = "uuid"
    queryset = Paciente.objects.all().order_by("curp")
    serializer_class = PacienteSerializer
    pagination_class = PageNumberPagination

    @action(detail=True, methods=["put"])
    def assign_card(self, request, uuid):
        paciente = Paciente.objects.filter(uuid=uuid).first()
        if not paciente.tiene_tarjeta:
            try:
                response = requests.get(f"{SMI_ARDUINO_PATH}/data",timeout=30)
                json_res = response.json()
                if response.status_code == 200:
                    paciente.tiene_tarjeta = True
                    paciente.mac_tarjeta = json_res['data']
                    paciente.save()
                    
            except requests.exceptions.ReadTimeout: 
                pass
            return Response({"No Existe Paciente":uuid})
        else:
            return Response({"Existe Paciente":uuid})
        
    @action(detail=True, methods=["put"])
    def unassign_card(self, request, uuid):
        paciente = Paciente.objects.filter(uuid=uuid).first()
        if paciente.tiene_tarjeta:
            PacienteTarjeta.objects.create(paciente=paciente, mac_tarjeta=paciente.mac_tarjeta)
            paciente.tiene_tarjeta = False
            paciente.mac_tarjeta = None
            paciente.save()
                    
            return Response({"No Existe Paciente":uuid})
        else:
            return Response({"Existe Paciente":uuid})
