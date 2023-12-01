import { createSlice } from "@reduxjs/toolkit";
import { fetchMenu } from "./menuApi";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  methodOrder: false,
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
  address: null
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMethodOrder: (state, action) => {
      state.methodOrder = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.error = "";
        const { menus, name, logoUrl, photoUrl, openingTime, closingTime, types, facebook, instagram, website, phone, extraPhone, description, address } = action.payload.response[0];
        state.menus = menus;
        state.name = name;
        state.logoUrl = logoUrl;
        state.photoUrl = photoUrl;
        state.openingTime = openingTime;
        state.closingTime = closingTime;
        state.types = types;
        state.venueId = +action.payload.venueId;
        state.tableId = +action.payload.tableId;
        state.facebook = facebook;
        state.instagram = instagram;
        state.website = website;
        state.phone = phone;
        state.extraPhone = extraPhone;
        state.description = description;
        state.address = address;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setMethodOrder } = menuSlice.actions;
export default menuSlice.reducer;
