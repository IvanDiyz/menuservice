import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  phone: null,
  address: null,
  address_details: null,
  deliveryTime: null,
  commentToDelivery: null,
  fastPossible: true,
  error: true,
};

export const getClientInfo = createSlice({
  name: "getClientInfo",
  initialState,
  reducers: {
    chageFrom: (state, action) => {
      state[action.payload.name] = action.payload.value;
      const someNull = action.payload.keysValids.some((key) => state[key] === null);
      state.error = someNull;
      if(!state.fastPossible) {
        action.payload.keysValids.push('deliveryTime')
        const deliveryNull = action.payload.keysValids.some((key) => state[key] === null || state[key] === '');
        state.error = deliveryNull;
      }
    },
    setFastPossible: (state, action) => {
      state.fastPossible = action.payload;
    },
    resetState: (state, action) => {
      Object.assign(state, initialState);
    }
  },
});

export const { chageFrom, setFastPossible, resetState } = getClientInfo.actions;
export default getClientInfo.reducer;
