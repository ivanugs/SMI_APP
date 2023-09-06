import { createSlice } from "@reduxjs/toolkit";
export const rutaSlice = createSlice({
  name: "ruta",
  initialState: {
    page: 1,
    rutas: [],
    ruta: {},
    isLoading: false,
  },
  reducers: {
    startLoadingRoutes: (state /* action */) => {
      state.isLoading = true;
    },
    setRoutes: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.rutas = action.payload.rutas;
    },
    setRoute: (state, action) => {
      state.isLoading = false;
      state.ruta = action.payload.ruta;
    },
  },
});
export const { startLoadingRoutes, setRoutes, setRoute } =  rutaSlice.actions;
