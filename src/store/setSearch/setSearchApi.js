import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchSeacrh = createAsyncThunk("user/fetchSeacrh", async (data, thunkAPI) => {
  const { actualSection, searchValue } = data
  try {
    const response = await api.get(`/menu/dish/search?query=${searchValue}&sectionId=${actualSection}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Что-то пошло не так!");
  }
});
