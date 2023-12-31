# Generated by Django 4.2.5 on 2023-09-06 20:59

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Ruta",
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
                ("punto_inicial", models.CharField(max_length=200, null=True)),
                ("destino", models.JSONField(default=dict, verbose_name="destino")),
            ],
            options={
                "db_table": "rutas",
            },
        ),
    ]
