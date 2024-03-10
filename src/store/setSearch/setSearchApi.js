import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const fetchSearch = createAsyncThunk("user/fetchSearch", async (data, thunkAPI) => {
  try {
    const result = await new Promise((resolve) => {
      debouncedFetchSearch(data).then((data) => {
        resolve(data);
      });
    });
    return result;
  } catch (e) {
    return thunkAPI.rejectWithValue("щось пішло не так!");
  }
});

// Функция debounce
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);
    });
  };
};

const debouncedFetchSearch = debounce(async (data) => {
  const { actualSection, searchValue, venueUId } = data;
  if(actualSection) {
    const sectionId = actualSection ? `sectionId=${actualSection}&` : '';
    const response = await api.get(`/menu/${venueUId}/dish/search-by-venue?query=${searchValue}&${sectionId}`);
    return response.data;
  } else {
    const response = await api.get(`/menu/${venueUId}/dish/search-by-venue?query=${searchValue}`);
    return response.data;
  }
}, 1000);