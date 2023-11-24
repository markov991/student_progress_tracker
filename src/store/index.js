import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userInfoSlice from "./userInfoSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, userInfo: userInfoSlice.reducer },
});

export default store;
