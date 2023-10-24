import { createSlice } from "@reduxjs/toolkit";
import { fetchClient } from "./clientApi";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  venue: {},
  type: [],
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    activeType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.venue = action.payload;
      })
      .addCase(fetchClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { activeType } = clientSlice.actions;
export default clientSlice.reducer;
