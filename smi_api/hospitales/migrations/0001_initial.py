# Generated by Django 4.2.5 on 2023-09-06 20:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Hospital",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                (
                    "uuid",
                    models.UUIDField(default=uuid.uuid4, editable=False, null=True),
                ),
                ("status", models.SmallIntegerField(default=1)),
                ("active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, null=True)),
                ("updated_at", models.DateTimeField(auto_now=True, null=True)),
                ("agno", models.IntegerField()),
                ("clues", models.CharField(max_length=15)),
                ("clave_institucion", models.CharField(max_length=10)),
                ("clave_municipio", models.IntegerField()),
                ("lat", models.FloatField(max_length=15)),
                ("long", models.FloatField(max_length=15)),
                ("distancia", models.FloatField(max_length=5)),
                ("tiempo_translado", models.FloatField(max_length=5)),
                ("nombre_de_la_unidad", models.CharField(max_length=255)),
                ("total_de_consultorios", models.IntegerField(null=True)),
                ("total_camas_area_hospitalizacion", models.IntegerField(null=True)),
                ("total_camas_en_otras_areas_no_hosp", models.IntegerField(null=True)),
                (
                    "total_medicos_generales_y_especialistas",
                    models.IntegerField(null=True),
                ),
                (
                    "total_de_enfermeras_en_contacto_con_el_paciente",
                    models.IntegerField(null=True),
                ),
            ],
            options={
                "db_table": "hospitales",
            },
        ),
    ]
