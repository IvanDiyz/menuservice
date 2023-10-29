import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateFilters: false,
  filters: {
    'alergen': false,
    'vegan': false,
    'spicy': false,
  },
};

export const setFilter = createSlice({
  name: "setFilter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters[action.payload.name] = action.payload.bool;
    },
    hasTrueFilter: (state, action) => {
      state.stateFilters = action.payload;
    }
  },
});

export const { changeFilter, hasTrueFilter } = setFilter.actions;
export default setFilter.reducer;
