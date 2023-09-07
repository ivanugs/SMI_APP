ESTADOS = [
    { "AGUASCALIENTES": 1},
    { "BAJA CALIFORNIA": 2},
    { "BAJA CALIFORNIA SUR": 3},
    { "CAMPECHE": 4},
    { "COAHUILA DE ZARAGOZA": 5},
    { "COLIMA": 6},
    { "CHIAPAS": 7},
    { "CHIHUAHUA":8},
    { "DISTRITO FEDERAL": 9},
    { "DURANGO": 10},
    { "GUANAJUATO": 11},
    { "GUERRERO": 12},
    { "HIDALGO": 13},
    { "JALISCO": 14},
    { "MEXICO": 15},
    { "MICHOACAN DE OCAMPO": 16},
    { "MORELOS": 17},
    { "NAYARIT": 18},
    { "NUEVO LEON": 19},
    { "OAXACA": 20},
    { "PUEBLA": 21},
    { "QUERETARO DE ARTEAGA": 22},
    { "QUINTANA ROO": 23},
    { "SAN LUIS POTOSI": 24},
    { "SINALOA": 25},
    { "SONORA": 26},
    { "TABASCO": 27},
    { "TAMAULIPAS": 28},
    { "TLAXCALA": 29},
    { "VERACRUZ DE IGNACIO DE LA LLAVE": 30},
    { "YUCATAN": 31},
    { "ZACATECAS": 32},
    { "ENTIDAD FEDERATIVA NO ESPECIFICADA": 33}
]

def retrieve_state_code(state):
    
    # initializing search key string
    search_key = state

    # Lista para almacenar los valores encontrados en los diccionarios
    res = []

    # Iterar a través de los diccionarios en la lista
    for test_dict in ESTADOS:
        # Verificar si la clave de búsqueda está en el diccionario actual
        for key in test_dict:
            if search_key in key:
                res.append(test_dict[key])

    return res[0]