import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (params, thunkAPI) => {
    try {
      const response = await api.post(`/order/${params.venueId}/${params.tableId}/12`, params.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
