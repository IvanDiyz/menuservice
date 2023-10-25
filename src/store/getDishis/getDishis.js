import { createSlice } from "@reduxjs/toolkit";
import { fetchDishis } from "./getDishisApi";

const initialState = {
  menuId: null,
  dishis: [],
};

export const getDishis = createSlice({
  name: "getDishis",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchDishis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.dishis = action.payload;
      })
      .addCase(fetchDishis.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchDishis.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setMenuId } = getDishis.actions;
export default getDishis.reducer;
