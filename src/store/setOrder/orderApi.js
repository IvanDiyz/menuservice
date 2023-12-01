import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import axios from "axios";

// const apitest = axios.create({
//   baseURL: "https://reqres.in",
// });

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (params, thunkAPI) => {
    if(!params.orderId) {
      try {
        const response = await api.post(`/order/${params.venueId}/${params.tableId}/9b60da07-c77e-479f-82fa-d19238cb5eb0`, params.data);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue("Что-то пошло не так!");
      }
    } else {
      try {
        const response = await api.patch(`/order/${params.orderId}`, params.data);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue("Что-то пошло не так!");
      }

    }
    // try {
    //   const response = await apitest.post(`/api/users`, {
    //     name: "morpheus",
    //     job: "leader",
    //   });
    //   return response.data;
    // } catch (e) {
    //   return thunkAPI.rejectWithValue("Что-то пошло не так!");
    // }
  }
);
