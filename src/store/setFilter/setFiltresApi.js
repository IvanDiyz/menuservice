import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchFiltres = createAsyncThunk(
  "user/fetchFiltres",
  async (params, thunkAPI) => {
    const sectionCostUrl = params.filters.cost ? `cost=${params.filters.cost}&` : '';
    const isNonAllergenic = params.filters.alergen ? `isNonAllergenic=${params.filters.alergen}&` : '';
    const forVegans = params.filters.vegan ? `forVegans=${params.filters.vegan}&` : '';
    const isSpicy = params.filters.spicy ? `isSpicy=${params.filters.spicy}&` : '';
    const sectionCookingUrl = params.filters.cookingTime ? `cookingTime=${params.filters.cookingTime}&` : '';
    const sectionIdUrl = params.sectionId ? `sectionId=${params.sectionId}&` : '';
    try {
      const response = await api.get(`/menu/${params.venueId}/dish/filter?menuId=${params.menuId}&${sectionIdUrl}${forVegans}${isNonAllergenic}${isSpicy}${sectionCookingUrl}${sectionCostUrl}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("щось пішло не так!");
    }
  }
);
