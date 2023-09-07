import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "ruta",
  initialState: {
    page: 1,
    pacientes: [],
    paciente: {},
    isLoading: false,
  },
  reducers: {
    startLoadingPatients: (state /* action */) => {
      state.isLoading = true;
    },
    setPatients: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.pacientes = action.payload.pacientes;
    },
    setPatient: (state, action) => {
      state.isLoading = false;
      state.paciente = action.payload.paciente;
    },
  },
});
export const { startLoadingPatients, setPatients, setPatient } =  pacientesSlice.actions;
