import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchMenu = createAsyncThunk(
  "user/fetchMenu",
  async (currentPage, thunkAPI) => {
    try {
      const response = await api.get(`/venue?limit=4&page=${currentPage}`);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
