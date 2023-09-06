from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class Usuario(AbstractUser):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True, null=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=50, null=True, unique=True)
    t_nombre_completo = models.CharField(max_length=255, null=True, unique=True)
    t_region = models.CharField(max_length=255, null=True)
    t_lider = models.CharField(max_length=255, null=True)
    t_puesto = models.CharField(max_length=255, null=True)
    t_pais = models.CharField(max_length=255, null=True)
    t_numero_nomina = models.IntegerField(null=True, unique=True)

    REQUIRED_FIELDS = ["email"]
    USERNAME_FIELD = "username"

    def full_name(self):
        name = self.t_nombre_completo
        if name == "":
            name = str(self.first_name + " " + self.last_name)
        return name

    def create(self, validated_data):
        user = Usuario(email=validated_data["email"], username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user
    
    class Meta:
        db_table = "usuarios"
