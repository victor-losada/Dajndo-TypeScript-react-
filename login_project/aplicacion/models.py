from django.db import models

# Create your models here.
 
class Usuarios(models.Model):
    numero_identificacion = models.CharField(max_length=25, unique=True )
    nombre_usuario = models.CharField(max_length=50)
    contraseña_usuario = models.CharField(max_length=60)

    def __str__(self):
        return self.nombre_usuario