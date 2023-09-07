# serializers.py
from rest_framework import serializers
from registros.models import Registro, TipoRegistro


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        
class TipoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoRegistro