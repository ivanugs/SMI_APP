from django.db import models
from smi_api.base.models import BaseModel
class Hospital(BaseModel):
    agno = models.IntegerField()
    clues = models.CharField(max_length=15)
    clave_institucion = models.CharField(max_length=10)
    clave_municipio = models.IntegerField()
    lat = models.FloatField(max_length=15)
    long = models.FloatField(max_length=15)
    distancia  = models.FloatField(max_length=5)
    tiempo_translado = models.FloatField(max_length=5)
    nombre_de_la_unidad = models.CharField(max_length=255)
    total_de_consultorios = models.IntegerField(null=True)
    total_camas_area_hospitalizacion = models.IntegerField(null=True)
    total_camas_en_otras_areas_no_hosp = models.IntegerField(null=True)
    total_medicos_generales_y_especialistas = models.IntegerField(null=True)
    total_de_enfermeras_en_contacto_con_el_paciente = models.IntegerField(null=True)

    def __str__(self):
        return self.nombre_de_la_unidad

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
     
    



