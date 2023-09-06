import uuid
from django.db import models

class BaseModel(models.Model):
    id = models.BigAutoField(primary_key=True)  
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, null=True)
    status = models.SmallIntegerField(default=1)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract=True # Set this model as Abstract

