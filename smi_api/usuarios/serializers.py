from .models import Usuario
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.state import token_backend
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["uuid", "email", "first_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UsuarioListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["uuid", "email", "first_name", "username"]

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super(CustomTokenRefreshSerializer, self).validate(attrs)
        decoded_payload = token_backend.decode(data["access"], verify=True)
        user_uuid = decoded_payload["user_uuid"]
        user = Usuario.objects.filter(uuid=user_uuid).first()
        if user is None:
            raise AuthenticationFailed("Usuario no encontrado!")
        refreshToken = RefreshToken.for_user(user)
        data.update(
            {
                'name': user.full_name(),
                'uuid': user.uuid,
                'refresh':str(refreshToken)
            }
        )
        return data
