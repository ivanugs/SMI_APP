import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    isCommonLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isCommonLoading = action.payload;
    },
  },
});

export const { setLoading } = commonSlice.actions;


