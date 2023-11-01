import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogedIn: false, haveAnAccount: false },
  reducers: {
    toogleAuth(state) {
      state.haveAnAccount = !state.haveAnAccount;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
