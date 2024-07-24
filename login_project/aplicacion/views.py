from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuarios
import bcrypt
import jwt
import os

@api_view(['POST'])
def login_view(request):
    numero_identificacion = request.data.get('numero_identificacion')
    contraseña_usuario = request.data.get('contraseña_usuario')
    
    try:
        usuario = Usuarios.objects.get(numero_identificacion=numero_identificacion)
        contraseña_cifrada = usuario.contraseña_usuario

        if bcrypt.checkpw(contraseña_usuario.encode('utf-8'), contraseña_cifrada.encode('utf-8')):
            token = jwt.encode(
                {'id_usuario': usuario.id, 'nombre_usuario': usuario.nombre_usuario},
                os.environ.get('SECRET_KEY'),
                algorithm='HS256'
            )
            return Response({'token': token, 'message': 'Usuario ingresado con éxito'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
    except Usuarios.DoesNotExist:
        return Response({'message': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
