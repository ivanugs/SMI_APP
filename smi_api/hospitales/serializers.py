# serializers.py
from rest_framework import serializers
from hospitales.models import Hospital


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        
