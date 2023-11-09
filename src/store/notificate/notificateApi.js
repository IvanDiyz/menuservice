import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const postNotificate = createAsyncThunk("user/postNotificate", async (postData, thunkAPI) => {
  try {
    const responsSections = await api.post(`/notification/notification-by-desk/26`, postData);
    return responsSections.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Что-то пошло не так!");
  }
});
