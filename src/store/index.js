import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userInfoSlice from "./userInfoSlice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userInfo: userInfoSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
