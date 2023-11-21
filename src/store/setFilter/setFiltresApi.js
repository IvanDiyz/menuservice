import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchFiltres = createAsyncThunk(
  "user/fetchFiltres",
  async (params, thunkAPI) => {
    const sectionCostUrl = params.filters.cost ? `cost=${params.filters.cost}&` : '';
    const sectionCookingUrl = params.filters.cookingTime ? `cookingTime=${params.filters.cookingTime}&` : '';
    const sectionIdUrl = params.sectionId ? `sectionId=${params.sectionId}&` : '';
    try {
      const response = await api.get(`/menu/${params.venueId}/dish/filter?${sectionIdUrl}isAllergen=${params.filters.alergen}&isSpicy=${params.filters.spicy}&${sectionCookingUrl}${sectionCostUrl}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
