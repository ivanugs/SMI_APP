import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    isCommonLoading: false,
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isCommonLoading = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
  },
});

export const { setLoading, setLongitude, setLatitude } = commonSlice.actions;


