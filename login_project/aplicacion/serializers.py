from rest_framework import serializers
from .models import Usuarios


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['numero_identificacion', 'nombre_usuario', 'contraseña_usuario']
