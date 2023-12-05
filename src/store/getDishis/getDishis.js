import { createSlice } from "@reduxjs/toolkit";
import { fetchDishis } from "./getDishisApi";

const initialState = {
  currentPage: 1,
  menuId: null,
  actualSection: null,
  dishis: {
    total: "",
    limit: "",
    pages: "",
    currentPage: "",
    items: []
  },
  stateDishis: false,
  isLoading: false,
};

export const getDishis = createSlice({
  name: "getDishis",
  initialState,
  reducers: {
    setActualSection: (state, action) => {
      state.actualSection = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearDishis: (state, action) => {
      state.dishis = initialState.dishis;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchDishis.fulfilled, (state, action) => {
        state.dishis.currentPage = "";
        state.dishis.pages = "";
        state.menuId = action?.payload.menuId;
        state.isLoading = false;
        state.stateDishis = true;
        state.error = "";
        state.menuId
          ? (state.dishis = {
              total: action.payload.data.total,
              limit: action.payload.data.limit,
              pages: action.payload.data.pages,
              currentPage: action.payload.data.currentPage,
              items: [...state.dishis.items, ...action.payload.data.items],
            })
          : (state.dishis.items = action.payload.data);
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

export const { clearDishis, setCurrentPage, setActualSection } = getDishis.actions;
export default getDishis.reducer;
