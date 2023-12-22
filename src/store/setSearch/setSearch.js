import { createSlice } from "@reduxjs/toolkit";
import { fetchSeacrh } from "./setSearchApi";

const initialState = {
  dishis: [],
  searchValue: '',
  isLoading: false,
};

export const setSearch = createSlice({
  name: "setSearch",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearDishis: (state, action) => {
      state.dishis = [];
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSeacrh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.dishis = action.payload;
      })
      .addCase(fetchSeacrh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSeacrh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { clearDishis, changeValue } = setSearch.actions;
export default setSearch.reducer;
