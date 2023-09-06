import { api } from "../../../api";
import {
    startLoadingRoutes,
    setRoutes,
    setRoute,
} from "./rutaSlice";

export const getRoutes = (page) => {
  return async (dispatch) => {
    dispatch(startLoadingRoutes());

    const { data } = await api.get(`/expertos?pagina=${page}`);

    dispatch(setRoutes({ routes: data, page: page }));
  };
};

export const getRoute = (id) => {
  return async (dispatch) => {
    dispatch(startLoadingRoutes());

    const { data } = await api.get(`/expertos/${id}`);

    dispatch(setRoute({ route: data }));
  };
};


