import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogedIn: false,
    haveAnAccount: false,
    userName: null,
    userId: null,
  },
  reducers: {
    toogleAuth(state) {
      state.haveAnAccount = !state.haveAnAccount;
    },
    logingIn(state, action) {
      state.isLogedIn = !state.isLogedIn;
      state.user = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
