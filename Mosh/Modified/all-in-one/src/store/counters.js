import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Counter",
  initialState: [
    {
      id: 1,
      value: 0,
    },
  ],
  reducers: {
    addCounter: (state) => {
      state.push({
        id: state.length > 0 ? state[state.length - 1].id + 1 : 0,
        value: 0,
      });
    },
    increaseCounter: (state, action) => {
      return state.map((count) =>
        count.id !== action.payload.id
          ? count
          : { ...count, value: action.payload.value + 1 }
      );
    },
    decreaseCounter: (state, action) => {
      return state.map((count) =>
        count.id !== action.payload.id
          ? count
          : { ...count, value: action.payload.value - 1 }
      );
    },
    deleteCounter: (state, action) => {
      return state.filter((counter) => counter.id !== action.payload.id);
    },
    resetCounter: (state) => {
      state.map((counter) => {
        counter.value = 0;
        return counter;
      });
    },
  },
});

export const {
  addCounter,
  increaseCounter,
  decreaseCounter,
  deleteCounter,
  resetCounter,
} = slice.actions;

export default slice.reducer;
