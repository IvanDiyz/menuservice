import { createSlice } from "@reduxjs/toolkit";
import { fetchParams } from "./paramsClientApi";

const initialState = {
  statuses: [],
  types: [],
};

export const getParams = createSlice({
  name: "getParams",
  initialState,
  reducer: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchParams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.statuses = action.payload.statuses;
        state.types = action.payload.types;
      })
      .addCase(fetchParams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchParams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export default getParams.reducer;
