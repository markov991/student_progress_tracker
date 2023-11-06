import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogedIn: false, haveAnAccount: false, user: null },
  reducers: {
    toogleAuth(state) {
      state.haveAnAccount = !state.haveAnAccount;
    },
    logingIn(state, action) {
      state.isLogedIn = !state.isLogedIn;
      state.user = action.payload.userEmail;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
