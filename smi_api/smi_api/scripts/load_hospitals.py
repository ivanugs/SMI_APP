import os
import csv
from hospitales.models import Hospital
import time

def load_hospitals():
    csv_file_path = os.path.join('data', 'dataset_hospitales.csv')

    with open(csv_file_path, 'r', encoding='utf-8-sig') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            agno = row['agno']
            clues = row['clues']
            clave_institucion = row['clave_institucion']
            clave_municipio = row['clave_municipio']
            # clave_entidad = row['clave_entidad']
            lat = row['lat']
            long = row['long']
            distancia = row['distancia']
            tiempo_translado = row['tiempo_translado']
            nombre_de_la_unidad = row['nombre_de_la_unidad']
            total_de_consultorios = row['total_de_consultorios']
            total_camas_area_hospitalizacion = row['total_camas_area_hospitalizacion']
            total_camas_en_otras_areas_no_hosp = row['total_camas_en_otras_areas_no_hosp']
            total_medicos_generales_y_especialistas = row['total_medicos_generales_y_especialistas']
            total_de_enfermeras_en_contacto_con_el_paciente = row['total_de_enfermeras_en_contacto_con_el_paciente']
            
            try:
                # Crear el usuario si no existe
                hospital, created = Hospital.objects.get_or_create(
                    agno = agno,
                    clues = clues,
                    clave_institucion = clave_institucion,
                    clave_municipio = clave_municipio,
                    # clave_entidad = clave_entidad,
                    lat = lat,
                    long = long,
                    distancia = distancia,
                    tiempo_translado = tiempo_translado,
                    nombre_de_la_unidad = nombre_de_la_unidad,
                    total_de_consultorios = total_de_consultorios,
                    total_camas_area_hospitalizacion = total_camas_area_hospitalizacion,
                    total_camas_en_otras_areas_no_hosp = total_camas_en_otras_areas_no_hosp,
                    total_medicos_generales_y_especialistas = total_medicos_generales_y_especialistas,
                    total_de_enfermeras_en_contacto_con_el_paciente = total_de_enfermeras_en_contacto_con_el_paciente,
                )
                
            except Exception as e:
                print(f'Error al procesar el registro: {e}')