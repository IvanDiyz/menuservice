import { createSlice } from "@reduxjs/toolkit";
import { fetchMenu } from "./menuApi";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  items: [],
  total: null,
  limit: null,
  pages: null,
  currentPage: 1,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        const { venues, total, limit, pages, currentPage } = action.payload;
        state.venues = venues;
        state.total = total;
        state.limit = limit;
        state.pages = pages;
        state.currentPage = currentPage;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { changePage } = menuSlice.actions;
export default menuSlice.reducer;
