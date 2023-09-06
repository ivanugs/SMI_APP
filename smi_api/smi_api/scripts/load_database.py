from registros.models import TipoRegistro


def crear_grupo(nombre_grupo):
    tipo_registro, creado = TipoRegistro.objects.get_or_create(nombre=nombre_grupo)
    if creado:
        print(f"Se creó el grupo: {nombre_grupo}")
    else:
        print(f"El grupo: {nombre_grupo} ya existe")

def load_database():
    tipos = [
       "lectura_paciente",
       "registro_paciente",
       "actualización_paciente",
       "eliminacion_paciente"        
    ]

    for tipo in tipos:
        crear_grupo(tipo)