import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "ruta",
  initialState: {
    page: 1,
    users: [],
    user: {},
    isLoading: false,
  },
  reducers: {
    startLoadingUsers: (state /* action */) => {
      state.isLoading = true;
    },
    setUsers: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.users = action.payload.users;
    },
    setUser: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
  },
});
export const { startLoadingUsers, setUsers, setUser } =  userSlice.actions;
