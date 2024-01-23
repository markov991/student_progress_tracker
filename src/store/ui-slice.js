import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isLoading: true, modalIsOpen: false },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setIsOpen(state, action) {
      state.modalIsOpen = action.payload.modalIsOpen;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
