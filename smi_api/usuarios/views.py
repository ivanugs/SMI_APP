from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from usuarios.serializers import UsuarioSerializer
from .models import User
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .serializers import  CustomTokenRefreshSerializer
from django.conf import settings
from django.contrib.auth.models import Group
from rest_framework.permissions import AllowAny

secret = settings.SECRET_KEY

class RegisterView(APIView):

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):

        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('Usuario no encontrado!')

        if not user.check_password(password):
            raise AuthenticationFailed('Contraseña incorrecta!')

        refreshToken = RefreshToken.for_user(user)
        accessToken = refreshToken.access_token

        decodeJTW = jwt.decode(str(accessToken), secret, algorithms=["HS256"]);

        decodeJTW['user_uuid'] = str(user.uuid)

        # Groups logic
        groups = Group.objects.filter(user=user)
        group_names = [group.name for group in groups]
        decodeJTW['groups'] = group_names
        
        token = jwt.encode(decodeJTW, secret, algorithm='HS256')
        
        response =  Response()
        # httponly maneja el token solo en el bockend
        response.set_cookie(key='access', value=token, httponly=False)
        response.data = {
            'name': user.full_name(),
            'uuid': user.uuid,
            'permissions': group_names,
            'access':token, 
            'refresh':str(refreshToken)
        }
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('access')
        # Obtener el usuario 

        if not token:
            raise AuthenticationFailed('No identificado!')
        try:
            payload = jwt.decode(token, secret, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('No identificado!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UsuarioSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access')
        response.data = {
            'message':'success'
        }

        return response


class TokenRefreshView(TokenRefreshView):
    """
    Custom Refresh token View
    """
    serializer_class = CustomTokenRefreshSerializer
    permission_classes = (AllowAny,)