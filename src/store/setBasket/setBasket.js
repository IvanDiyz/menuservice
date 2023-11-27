import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: '',
  check: 'payAll',
  items: [],
};

export const setBasket = createSlice({
  name: "setBasket",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setCheck: (state, action) => {
      state.check = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    clearItems: (state, action) => {
      state.items = [];
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      
      let objectToRemove = action.payload
      const newArray = state.items.filter((item) => !defineItem(item, objectToRemove));
      state.items = newArray;
    }
  },
});

// находим наш объект который уже существует в items
const defineItem = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


export const { addItem, removeItem, clearItems, setItems, setPaymentMethod, setCheck, } = setBasket.actions;
export default setBasket.reducer;
