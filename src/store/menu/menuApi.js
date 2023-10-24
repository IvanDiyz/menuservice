import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchMenu = createAsyncThunk(
  "user/fetchMenu",
  async (venueId, thunkAPI) => {
    try {
      const response = await api.get(`/venue/1/main-page`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
