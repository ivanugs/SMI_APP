from django.db import models
from smi_api.base.models import BaseModel

class Paciente(BaseModel):
    apellido_paterno = models.CharField(max_length=200, null=False)
    apellido_materno = models.CharField(max_length=200, null=False)
    nombres = models.CharField(max_length=500, null=False)
    curp = models.CharField(max_length=18, null=True)
    nss = models.CharField(max_length=11, null=True)
    fecha_nacimiento = models.DateField(null=False)
    lat = models.FloatField(max_length=15)
    long = models.FloatField(max_length=15)
    a_imss = models.BooleanField(default=False)
    a_isste = models.BooleanField(default=False)
    a_privado = models.BooleanField(default=False)
    a_militar = models.BooleanField(default=False)
    
    class Meta:
        db_table = "pacientes"
