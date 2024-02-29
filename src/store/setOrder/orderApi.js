import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (params, thunkAPI) => {
    if(!params.orderId) {
      try {
        const response = await api.post(`/order/${params.venueId}/${params.tableId}/9b60da07-c77e-479f-82fa-d19238cb5eb0`, params.data)
        // await nitificateCall(response.data.id, params.request)
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue("щось пішло не так!");
      }
    } else {
      try {
        const response = await api.patch(`/order/${params.orderId}`, params.data);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue("щось пішло не так!");
      }

    }
  }
);


const nitificateCall = async (id, request) => {
  await api.post(`/notification/notification-by-order/${id}`, request);
}