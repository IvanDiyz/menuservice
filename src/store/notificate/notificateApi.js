import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const postNotificate = createAsyncThunk("user/postNotificate", async (postData, thunkAPI) => {
  try {
    const response = await api.post(`/notification/notification-by-desk/${postData.tableId}`, postData.request);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("щось пішло не так!");
  }
});
export const orderNotificate = createAsyncThunk("user/orderNotificate", async (postData, thunkAPI) => {
  try {
    // return response.data;
    const responseOrder = await api.patch(`/order/${postData.orderId}`, postData.patchOrder);
    const response = await api.post(`/notification/notification-by-order/${postData.orderId}`, postData.request);
    const data = {
      orderPatch: responseOrder.data,
      notificate: response.data
    }
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue("щось пішло не так!");
  }
});
