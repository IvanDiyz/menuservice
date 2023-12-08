import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchMenu = createAsyncThunk(
  "user/fetchMenu",
  async (params, thunkAPI) => {
    try {
      const response = await api.get(`/venue/${params.idvenue}/desk/${params.idtable}/main-page`);
      const data = {
        response: response.data,
        venueId: params.idvenue,
        tableId: params.idtable
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Что-то пошло не так!");
    }
  }
);
