import { api } from "../../../api";
import {
  startLoadingPatients,
  setPatient,
  setPatients
} from "./pacientesSlice";

export const getPatients = (page) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPatients());

    const { data } = await api.get(`/pacientes?pagina=${page}`);

    dispatch(setPatients({ pacientes: data, page: page }));
  };
};

export const getPatient = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPatients());

    const { data } = await api.get(`/pacientes/${id}`);

    dispatch(setPatient({ paciente: data }));
  };
};

export const assignPatientCard = (uuid) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPatients());

    const { data } = await api.put(`/pacientes/${uuid}/assign_card/`);

    dispatch(setPatient({ paciente: data }));
  };
};

export const unassignPatientCard = (uuid) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPatients());

    const { data } = await api.put(`/pacientes/${uuid}/unassign_card/`);

    dispatch(setPatient({ paciente: data }));
  };
};



