# Generated by Django 4.2.5 on 2023-09-06 20:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Paciente",
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
                ("apellido_paterno", models.CharField(max_length=200)),
                ("apellido_materno", models.CharField(max_length=200)),
                ("nombres", models.CharField(max_length=500)),
                ("curp", models.CharField(max_length=18, null=True)),
                ("nss", models.CharField(max_length=11, null=True)),
                ("fecha_nacimiento", models.DateField()),
                ("lat", models.FloatField(max_length=15)),
                ("long", models.FloatField(max_length=15)),
                ("a_imss", models.BooleanField(default=False)),
                ("a_isste", models.BooleanField(default=False)),
                ("a_privado", models.BooleanField(default=False)),
                ("a_militar", models.BooleanField(default=False)),
            ],
            options={
                "db_table": "pacientes",
            },
        ),
    ]
