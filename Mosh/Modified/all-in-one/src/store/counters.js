import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Counter",
  initialState: [],
  reducers: {
    increaseCounter: (state, action) => {},
    decreaseCounter: (state, action) => {},
  },
});

export const { increaseCounter, decreaseCounter } = slice.actions;

export default slice.reducer;
