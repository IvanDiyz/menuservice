import { createSlice } from "@reduxjs/toolkit";
import { fetchDishis } from "./getDishisApi";

const initialState = {
  menuId: null,
  actualSection: null,
  dishis: [],
  stateDishis: false,
};

export const getDishis = createSlice({
  name: "getDishis",
  initialState,
  reducers: {
    setActualSection: (state, action) => {
      state.actualSection = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchDishis.fulfilled, (state, action) => {
        state.menuId = action?.payload.menuId;
        state.isLoading = false;
        state.stateDishis = true;
        state.error = "";
        state.menuId ? state.dishis = action.payload.data : state.dishis.items = action.payload.data;
        
      })
      .addCase(fetchDishis.pending, (state) => {
        state.isLoading = true;
        state.stateDishis = false;
        state.error = "";
        state.menuId = null;
      })
      .addCase(fetchDishis.rejected, (state, action) => {
        state.stateDishis = false;
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setActualSection } = getDishis.actions;
export default getDishis.reducer;
