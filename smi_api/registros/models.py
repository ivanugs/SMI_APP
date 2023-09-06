from django.db import models
from smi_api.base.models import BaseModel


"""
Tipos de registro tarjeta
lectura_paciente
registro_paciente
actualización_paciente
eliminacion_paciente
""" 

class TipoRegistro(BaseModel):
    nombre = models.CharField(max_length=50)

    class Meta:
        db_table = "tipos_registro"
    

class Registro(BaseModel):
    tipo_registro = models.ForeignKey(
        TipoRegistro, on_delete=models.CASCADE, db_column="tipo_registro_id", null=True
    )
    card = models.CharField(max_length=50, null=True)
    
    class Meta:
        db_table = "registros"



