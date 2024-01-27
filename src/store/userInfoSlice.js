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
    userCourses: [],
    students: [],
  },
  reducers: {
    settingUserInfo(state, action) {
      state.username = action.payload.userName;
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
      state.userInfoFilled = action.payload.userInfoFilled;
      state.userInfo = action.payload.userInfo;
      state.userCourses = action.payload.userCourses;
      state.students = action.payload.students;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice;
