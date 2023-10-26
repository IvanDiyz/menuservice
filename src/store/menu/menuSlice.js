import { createSlice } from "@reduxjs/toolkit";
import { fetchMenu } from "./menuApi";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  methodOrder: 'Inside',
  venueId: 1,
  menus: [],
  name: null,
  logoUrl: null,
  photoUrl: null,
  openingTime: null,
  closingTime: null,
  types: [],
  isLoading: 'nune'
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMethodOrder: (state, acton) => {
      state.methodOrder = acton.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        const { menus, name, logoUrl, photoUrl, openingTime, closingTime, types } = action.payload[0];
        state.menus = menus;
        state.name = name;
        state.logoUrl = logoUrl;
        state.photoUrl = photoUrl;
        state.openingTime = openingTime;
        state.closingTime = closingTime;
        state.types = types;
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
