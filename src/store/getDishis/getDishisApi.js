import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchDishis = createAsyncThunk("user/fetchDishis", async (id, thunkAPI) => {
  const {selectedSection, menuId} = id;
  try {
        if(selectedSection == null) {
      const responsSections = await api.get(`/menu/${menuId}/dish?limit=12&page=1`);
      return {data:responsSections.data, menuId: menuId};
    }else {
      const responsSections = await api.get(`/menu/section/${selectedSection}/dish`);
      return {data: responsSections.data};
    }
  } catch (e) {
    return thunkAPI.rejectWithValue("Что-то пошло не так!");
  }
});
