import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchParams = createAsyncThunk("user/fetchParams", async () => {
  try {
    const response = await api.get(`/venue/statuses`);
    const responseTypes = await api.get(`/venue/merchantTypes`);
    const data = {
      statuses: response.data,
      types: responseTypes.data,
    };
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Что-то пошло не так!");
  }
});
