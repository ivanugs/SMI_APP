from django.db import models
from smi_api.base.models import BaseModel
from hospitales.models import Hospital


class Servicio(BaseModel):
    nombre = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre_de_la_unidad
    
class HospitalServicio(BaseModel):
    hospital = models.ForeignKey(
        Hospital, on_delete=models.CASCADE, db_column="hospital_id", null=True
    )
    servicio = models.ForeignKey(
        Servicio, on_delete=models.CASCADE, db_column="servicio_id", null=True
    )

    def __str__(self):
        return self.hospital.nombre_de_la_unidad + self.servicio.nombre
     
    



