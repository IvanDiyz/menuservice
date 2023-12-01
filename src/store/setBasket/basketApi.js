import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchBasket = createAsyncThunk(
  "order/fetchBasket",
  async (orderId, thunkAPI) => {
    try {
      const response = await api.get(`/order/${orderId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
