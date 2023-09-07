import { api } from "../../../api";
import {
    startLoadingUsers,
    setUsers,
    setUser,
} from "./userSlice";

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(startLoadingUsers());

    const { data } = await api.get(`/usuarios/list`);

    dispatch(setUsers({ users: data }));
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    dispatch(startLoadingUsers());

    const { data } = await api.get(`/usuarios/${id}`);

    dispatch(setUser({ user: data }));
  };
};


