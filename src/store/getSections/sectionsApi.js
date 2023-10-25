import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchSections = createAsyncThunk("user/fetchSections", async (menuId, thunkAPI) => {
  try {
    const responsSections = await api.get(`/menu/${menuId}/section`);
    return responsSections.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Что-то пошло не так!");
  }
});
