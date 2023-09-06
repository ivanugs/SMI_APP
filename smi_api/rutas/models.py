from django.db import models
from smi_api.base.models import BaseModel
from django.db.models import JSONField

class Ruta(BaseModel):
    punto_inicial = models.CharField(max_length=200, null=True)
    destino = JSONField("destino", default=dict)