from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rutas.models import Ruta
from rutas.serializers import RutaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from hospitales.models import Hospital

# Pandas
from django_pandas.io import read_frame
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.model_selection import train_test_split
from sklearn import linear_model


def funcionEvaluacion(df_my_location):
    pref_Tiempo = 0.4
    pref_Distancia = 0.15
    pref_Consultorio = 0.15
    pref_Medicos = 0.3
     # Importar datos  
    qs = Hospital.objects.all()
    df_Hospitals = read_frame(qs)
    df_Hospitals = pd.DataFrame(df_Hospitals)
    df_Hospitals.head(5)
    df_LatitudHospitals = pd.DataFrame(df_Hospitals['LATITUD'])
    df_LongitudHospitals = pd.DataFrame(df_Hospitals['LONGITUD'])
    df_coordenadasHospitals = df_LatitudHospitals.join(df_LongitudHospitals)
    nbrs = NearestNeighbors(n_neighbors=15, algorithm='auto').fit(
        df_coordenadasHospitals)
    distances, indices = nbrs.kneighbors(df_my_location)
    df_Out = pd.DataFrame(indices)
    df_Out = df_Out.T
    df_Out = df_Out.rename({0: "Indice"}, axis='columns')
       # Se empieza crear el dataframe final el cual va a contener toda la informacion de salida
       # La API añade los tiempos de traslado y distancia al dataframe

    for i in df_Out.index:
            indice = df_Out.iat[i, 0]
            df_Out.at[i, 'LATITUD'] = df_Hospitals.iat[indice, 5]
            df_Out.at[i, 'LONGITUD'] = df_Hospitals.iat[indice, 6]
            df_Out.at[i, 'NOMBRE_DE_LA_UNIDAD'] = df_Hospitals.iat[indice, 9]
            df_Out.at[i, 'TOTAL_DE_CONSULTORIOS'] = df_Hospitals.iat[indice, 10]
            df_Out.at[i, 'TOTAL_MEDICOS_GENERALES_Y_ESPECIALISTAS'] = df_Hospitals.iat[indice, 13]
            hospital_location = (
                df_Hospitals.iat[indice, 5], df_Hospitals.iat[indice, 6])
            df_Out.at[i, 'Tiempo_Estimado(seg)'] = bing.travelTime(
                my_location, hospital_location)
            df_Out.at[i, 'Distancia_Estimada(km)'] = bing.travelDistance(
                my_location, hospital_location)
        # Se hace la prediccion de las calificaciones mediante el algoritmo de Bayesian Ridge Regressor
    pred = df_Out[['TOTAL_DE_CONSULTORIOS',
                       'TOTAL_MEDICOS_GENERALES_Y_ESPECIALISTAS']]
    df_Out["Calificacion"] = reg.predict(pred)

        # Haciendo el PercentRank de las variables que no son estaticas sobre el data frame ya filtrado de los nearest neighbors
    df_Out['Ev_Tiempo'] = df_Out.reset_index()[['Tiempo_Estimado(seg)']] \
            .apply(lambda x: (x.rank(method='dense') - 1) / (x.nunique() - 1)) \
            .values

    df_Out['Ev_Distancia'] = df_Out.reset_index()[['Distancia_Estimada(km)']] \
            .apply(lambda x: (x.rank(method='dense') - 1) / (x.nunique() - 1)) \
            .values

        # Aquellos parametros que sean los menores seran los que tengan la maxima calificacion
    df_Out["Ev_Tiempo"] = (-1 * df_Out["Ev_Tiempo"])+1
    df_Out["Ev_Distancia"] = (-1 * df_Out["Ev_Distancia"])+1

        # Sumando todas las calificaciones y multiplicandolas por su factor de preferencia para obtener la calificacion final
    for i in df_Out.index:
        df_Out["Calificacion_Final"] = (df_Out['Ev_Tiempo'] * pref_Tiempo
                                            + df_Out['Ev_Distancia'] *
                                            pref_Distancia
                                            + df_Out['Calificacion'])

    df_Out = df_Out.drop(['Calificacion'], axis=1)
    df_Out = df_Out.drop(['Ev_Tiempo'], axis=1)
    df_Out = df_Out.drop(['Ev_Distancia'], axis=1)
    # Haciendo el rankeo final con las calificaciones finales obtenidas
    df_Out["Ranking"] = df_Out['Calificacion_Final'].rank(
        method='dense', ascending=False)

    result = df_Out
    return result


class RutaViewSet(viewsets.ModelViewSet):

    lookup_field = "id"
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer
    pagination_class = PageNumberPagination

    @action(detail=False, methods=["get"])
    def get_route(self, request):
        # Porcentajes de Preferencia, dados por el usuario. En esta etapa fueron definidos por el equipo
        
        # Variables
        lat = request.GET.get("lat")
        lng = request.GET.get("lng")
        if lng != '' and lat != '':
            longitude = float(lng)
            latitude = float(lng)
        else:
            return Response("Invalid response")
            # Importar datos

        qs = Hospital.objects.all()
        df_Hospitals = read_frame(qs)
        # Se eliminó un print hospitals
        df_Hospitals = pd.DataFrame(df_Hospitals)
        df_Hospitals.head(5)

        # Juntando las coordenadas de los hospitales en un solo dataframe que es utilizado por el algoritmo de Nearest Neighbors
        df_LatitudHospitals = pd.DataFrame(df_Hospitals['LATITUD'])
        df_LongitudHospitals = pd.DataFrame(df_Hospitals['LONGITUD'])
        df_coordenadasHospitals = df_LatitudHospitals.join(
            df_LongitudHospitals)

        Ev_hospitales = df_Hospitals

        # Percentrank(Evaluacion) de los parametros Total de Consultorios y Medicos Generales (Variables Estaticas)

        Ev_hospitales['Ev_Consultorios'] = Ev_hospitales.reset_index()[['TOTAL_DE_CONSULTORIOS']] \
            .apply(lambda x: (x.rank(method='dense') - 1) / (x.nunique() - 1)) \
            .values

        Ev_hospitales['Ev_Medicos'] = Ev_hospitales.reset_index()[['TOTAL_MEDICOS_GENERALES_Y_ESPECIALISTAS']] \
            .apply(lambda x: (x.rank(method='dense') - 1) / (x.nunique() - 1)) \
            .values

        # Se añade Calificacion al dataframe de evaluación la cual suma de estos dos parametros multiplicado por
        # su factor de preferencia
        Ev_hospitales["Calificacion"] = ((Ev_hospitales['Ev_Consultorios'] * pref_Consultorio)
                                         + (Ev_hospitales['Ev_Medicos'] * pref_Medicos))

        # Solamente se seleccionaran los 10 neighbors mas cercanos
        nbrs = NearestNeighbors(n_neighbors=15, algorithm='auto').fit(
            df_coordenadasHospitals)

        X = Ev_hospitales[['TOTAL_DE_CONSULTORIOS',
                           'TOTAL_MEDICOS_GENERALES_Y_ESPECIALISTAS']]
        y = Ev_hospitales['Calificacion']
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.33, random_state=417)

        regr = linear_model.BayesianRidge()
        reg = regr.fit(X_train, y_train)
        y_pred = reg.predict(X_test)
