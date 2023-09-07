import { api } from "../../../api";
import {
  startLoadingHospitals,
  setHospital,
  setHospitals
} from "./hospitalesSlice";

export const getHospitals = (page) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingHospitals());

    const { data } = await api.get(`/hospitales?pagina=${page}`);

    dispatch(setHospitals({ hospitales: data, page: page }));
  };
};

export const getHospital = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingHospitals());

    const { data } = await api.get(`/hospitales/${id}`);

    dispatch(setHospital({ hospital: data }));
  };
};


export const getHospitalRecommendations = (lat,lng) => {
    return async (dispatch, getState) => {
      dispatch(startLoadingHospitals());
  
      const { data } = await api.get(`/rutas/get_route?lat=${lat}&lng=${lng}`);
  
      dispatch(setHospitals({ hospitales: data.data }));
    };
  };