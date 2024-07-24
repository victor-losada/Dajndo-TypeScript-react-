import os
import django
import bcrypt

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'login_project.settings')
django.setup()

from aplicacion.models import Usuarios

def crear_usuarios(numero_identificacion, nombre_usuario, contraseña):
    contraseña_cifrada = bcrypt.hashpw(contraseña.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')

    usuario = Usuarios(
        numero_identificacion=numero_identificacion,
        nombre_usuario=nombre_usuario,
        contraseña_usuario=contraseña_cifrada
    )

    usuario.save()
    print(f'usuario {nombre_usuario} creado con exito')

crear_usuarios('1079534803','victor manuel', 'victor1234')