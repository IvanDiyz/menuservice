import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchClient = createAsyncThunk(
  "user/fetchClient",
  async (idClient, thunkAPI) => {
    try {
      const response = await api.get(`/venue/${idClient}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
