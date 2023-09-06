from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rutas.models import Ruta
from rutas.serializers import RutaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from hospitales.models import Hospital

#Pandas
from django_pandas.io import read_frame
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.model_selection import train_test_split
from sklearn import linear_model

class RutaViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer
    pagination_class = PageNumberPagination
    
    @action(detail=False, methods=["get"])
    def get_route(self, request):
        #Porcentajes de Preferencia, dados por el usuario. En esta etapa fueron definidos por el equipo
        pref_Tiempo = 0.4
        pref_Distancia = 0.15
        pref_Consultorio = 0.15
        pref_Medicos = 0.3
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
        df_coordenadasHospitals = df_LatitudHospitals.join(df_LongitudHospitals)

        Ev_hospitales = df_Hospitals

        # Percentrank(Evaluacion) de los parametros Total de Consultorios y Medicos Generales (Variables Estaticas)

        Ev_hospitales['Ev_Consultorios'] = Ev_hospitales.reset_index() \
                                        [['TOTAL_DE_CONSULTORIOS']] \
                                        .apply(lambda x: (x.rank(method='dense') - 1) / (x.nunique() - 1) ) \
                                        .values

        Ev_hospitales['Ev_Medicos'] = Ev_hospitales.reset_index() \
                                    [['TOTAL_MEDICOS_GENERALES_Y_ESPECIALISTAS']] \
                                    .apply(lambda x: (x.rank(method='dense') - 1) / (x.nunique() - 1) ) \
                                    .values

        # Se añade Calificacion al dataframe de evaluación la cual suma de estos dos parametros multiplicado por
        #su factor de preferencia
        Ev_hospitales["Calificacion"] =( (Ev_hospitales['Ev_Consultorios']* pref_Consultorio)
                                                        +(Ev_hospitales['Ev_Medicos']* pref_Medicos))
        
        #Solamente se seleccionaran los 10 neighbors mas cercanos
        nbrs = NearestNeighbors(n_neighbors=15, algorithm='auto').fit(df_coordenadasHospitals)

        X = Ev_hospitales[['TOTAL_DE_CONSULTORIOS','TOTAL_MEDICOS_GENERALES_Y_ESPECIALISTAS']]
        y = Ev_hospitales['Calificacion']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=417)

        regr = linear_model.BayesianRidge()
        reg = regr.fit(X_train, y_train)
        y_pred = reg.predict(X_test)

            
    

