import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  phone: null,
  address: null,
  address_details: null,
  deliveryTime: null,
  commentToDelivery: null,
};

export const getClientInfo = createSlice({
  name: "getClientInfo",
  initialState,
  reducers: {
    chageFrom: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { chageFrom } = getClientInfo.actions;
export default getClientInfo.reducer;
