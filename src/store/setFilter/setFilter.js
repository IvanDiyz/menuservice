import { createSlice } from "@reduxjs/toolkit";
import { fetchFiltres } from "./setFiltresApi";

const initialState = {
  filterPage: false,
  stateFilters: false,
  filters: {
    'alergen': false,
    'vegan': false,
    'spicy': false,
    'cookingTime': false, 
    'cost': false, 
  },
  filteredDish: [],
};

export const setFilter = createSlice({
  name: "setFilter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      if(action.payload?.name === 'default') {
        state.filters['cookingTime'] = false;
        state.filters['cost'] = false;
        return
      }
      if(action.payload?.type === 'multiselect') {
        state.filters['cookingTime'] = false;
        state.filters['cost'] = false
      }
      state.filters[action.payload.name] = action.payload?.value;
    },
    hasTrueFilter: (state, action) => {
      state.stateFilters = action.payload;
    },
    movePage: (state, action) => {
      state.filterPage = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFiltres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.filteredDish = action.payload;
      })
      .addCase(fetchFiltres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFiltres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { movePage, changeFilter, hasTrueFilter } = setFilter.actions;
export default setFilter.reducer;
