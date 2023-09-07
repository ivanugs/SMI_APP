import { createSlice } from "@reduxjs/toolkit";
export const hospitalesSlice = createSlice({
  name: "ruta",
  initialState: {
    page: 1,
    hospitales: [],
    hospital: {},
    register:{},
    isLoading: false,
  },
  reducers: {
    startLoadingHospitals: (state /* action */) => {
      state.isLoading = true;
    },
    setHospitals: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.hospitales = action.payload.hospitales;
    },
    setHospital: (state, action) => {
      state.isLoading = false;
      state.hospital = action.payload.hospital;
    },
    setRegister: (state, action) => {
      state.isLoading = false;
      state.register = action.payload.register;
    },
  },
});
export const { startLoadingHospitals, setHospitals, setHospital, setRegister } =  hospitalesSlice.actions;
