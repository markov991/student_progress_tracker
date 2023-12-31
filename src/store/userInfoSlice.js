import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    username: null,
    userId: null,
    userType: null,
    userInfoFilled: null,
    userInfo: {
      name: null,
      studiesType: null,
      university: null,
      faculty: null,
    },
    pendingRequests: [],
    approvedRequests: ["6789"],
  },
  reducers: {
    settingUserInfo(state, action) {
      state.username = action.payload.userName;
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
      state.userInfoFilled = action.payload.userInfoFilled;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice;
