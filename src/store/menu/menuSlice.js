import { createSlice } from "@reduxjs/toolkit";
import { fetchMenu } from "./menuApi";
import { HYDRATE } from "next-redux-wrapper";
import { fetchOrder } from "../setOrder/orderApi";

const initialState = {
  methodOrder: false,
  isDelivery: false,
  venueId: null,
  tableId: null,
  menus: [],
  name: null,
  logoUrl: null,
  photoUrl: null,
  openingTime: null,
  closingTime: null,
  types: [],
  isLoading: 'nune',
  facebook: null,
  instagram: null,
  website: null,
  phone: null,
  extraPhone: null,
  description: null,
  address: null,
  orders: null,
  status: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMethodOrder: (state, action) => {
      state.methodOrder = action.payload;
      if(action.payload === 'delivery') {
        state.isDelivery = true;
      } else {
        state.isDelivery = false;
      } 
    },
    managerVenueId: (state, action) => {
      state.venueId = action.payload.venueId;
      state.tableId = +action.payload.tableId;
    },
    managerOrderId: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.error = "";
        const { orders, menus, name, logoUrl, photoUrl, openingTime, closingTime, types, facebook, instagram, website, phone, extraPhone, description, address } = action.payload.response;
        state.menus = menus;
        state.name = name;
        state.logoUrl = logoUrl;
        state.photoUrl = photoUrl;
        state.openingTime = openingTime;
        state.closingTime = closingTime;
        state.types = types;
        state.venueId = action.payload.venueId; //ожидаем что в ответе будет id
        state.tableId = +action.payload.tableId;
        state.facebook = facebook;
        state.instagram = instagram;
        state.website = website;
        state.phone = phone;
        state.extraPhone = extraPhone;
        state.description = description;
        state.address = address;
        if(action.payload.response?.orders[0]) {
          state.orders = action.payload.response?.orders[0]?.id;
        }
      })
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const {id, totalAmount, isPaid} = action.payload
        state.orders = id;
        state.isPaid = isPaid;
        state.totalAmount = +totalAmount;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

export const { managerOrderId, managerVenueId, setMethodOrder } = menuSlice.actions;
export default menuSlice.reducer;
