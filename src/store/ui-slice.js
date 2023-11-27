import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isLoading: true },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
