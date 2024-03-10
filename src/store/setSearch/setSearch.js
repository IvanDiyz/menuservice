import { createSlice } from "@reduxjs/toolkit";
import { fetchSearch } from "./setSearchApi";

const initialState = {
  dishis: [],
  searchValue: '',
  isLoading: false,
  stateSearch: false,
};

export const setSearch = createSlice({
  name: "setSearch",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.searchValue = action.payload;
      if(action.payload.length == 0) {
        state.dishis = [];
      }
    },
    clearDishis: (state, action) => {
      state.dishis = [];
    },
    setOpenedSearch: (state, action) => {
      state.stateSearch = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.dishis = action.payload;
      })
      .addCase(fetchSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { clearDishis, changeValue, setOpenedSearch } = setSearch.actions;
export default setSearch.reducer;
