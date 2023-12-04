import { createSlice } from "@reduxjs/toolkit";
import { fetchSections } from "./sectionsApi";

const initialState = {
  menuId: null,
  menuName: '',
  sections: [],
};

export const getSections = createSlice({
  name: "getSections",
  initialState,
  reducers: {
    setMenuId: (state, action) => {
      state.menuId = action.payload.id;
      state.menuName = action.payload.name;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.sections = action.payload;
      })
      .addCase(fetchSections.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setMenuId } = getSections.actions;
export default getSections.reducer;
