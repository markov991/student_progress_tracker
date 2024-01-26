import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: true,
    modalIsOpen: false,
    modalType: { modalIsAddCourse: false, modalIsAddStudent: false },
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setIsOpen(state, action) {
      state.modalIsOpen = action.payload.modalIsOpen;
      state.modalType.modalIsAddCourse = action.payload.modalIsAddCourse;
      state.modalType.modalIsAddStudent = action.payload.modalIsAddStudent;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
