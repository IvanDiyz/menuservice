import { createSlice } from "@reduxjs/toolkit";
import { fetchSection } from "./sectionApi";

const initialState = {
  statuses: [],
  types: [],
};

export const getSection = createSlice({
  name: "getSection",
  initialState,
  reducer: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.statuses = action.payload.statuses;
        state.types = action.payload.types;
      })
      .addCase(fetchSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export default getSection.reducer;
