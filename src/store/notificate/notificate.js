import { createSlice } from "@reduxjs/toolkit";
import { postNotificate } from "./notificateApi";

const initialState = {
  notificate: false,
  status: '',
};

export const notificate = createSlice({
  name: "notificate",
  initialState,
  reducers: {
    setNotificate: (state, acton) => {
      state.notificate = acton.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(postNotificate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postNotificate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(postNotificate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }),
});

export const { setNotificate } = notificate.actions;
export default notificate.reducer;
