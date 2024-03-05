import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { removeId } from "./setBasket";

export const fetchBasket = createAsyncThunk(
  "order/fetchBasket",
  async (data, thunkAPI) => {
    try {
      const hasUnpaidOrder = await checkIsPaid(data.tableId);
      if (hasUnpaidOrder) {
        const response = await api.get(`/order/${data.orderId}`);
        return response.data;
      } else {
        thunkAPI.dispatch(removeId())
        return [];
      }
    } catch (e) {
      return thunkAPI.rejectWithValue("щось пішло не так!");
    }
  }
);


// function to check isPaid
const checkIsPaid = async (deskId) => {
  try {
    const response = await api.get(`/order/desk/${deskId}`);
    const orders = response.data;

    // checking the presence of at least one order with isPaid: false
    const hasUnpaidOrder = orders.some((order) => !order.isPaid);

    return hasUnpaidOrder;
  } catch (error) {
    console.error("Error checking isPaid:", error);
    throw error; 
  }
};