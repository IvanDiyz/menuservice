import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../setOrder/orderApi";
import { fetchBasket } from "../setBasket/basketApi";

const initialState = {
  allAmount: 0,
  paymentMethod: 'cash',
  check: 'payAll',
  items: [],
  status: false,
  orderId: '',
  tips: 0,
  isPaid: null,
  totalAmount: 0,
  responsDish: [],
  paymentStatus: false,
};

export const setBasket = createSlice({
  name: "setBasket",
  initialState,
  reducers: {
    giveTips: (state, action) => {
      if (action.payload.inputTips) {
        state.tips = +action.payload.inputValue;
        state.allAmount = state.totalAmount + state.tips;
      } else {
        state.tips = Math.floor(
          state.totalAmount * (action.payload.actualTips / 100)
        );
        state.allAmount = state.totalAmount + state.tips;
      }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      state.tips = 0;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
      
    },
    getPaymentStatus: (state, action) => {
      console.log('asd',state)
      if(action.payload == 'true') {
        state.paymentStatus = true;
      } else {
        state.paymentStatus = false;
      }
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
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const {id, totalAmount, isPaid} = action.payload
        state.status = "succeeded";
        state.orderId = id;
        state.isPaid = true;
        state.totalAmount = +totalAmount;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBasket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        if(action.payload.isPaid) {
          Object.assign(state, initialState);
        } else {
          const {id, totalAmount, isPaid, dishes} = action.payload
          state.data = action.payload;
          state.responsDish = dishes;
          state.items = dishes;
          state.status = "succeeded";
          state.orderId = id;
          state.isPaid = true; // не забыть поменять на isPaid
          state.totalAmount = +totalAmount;
        }
      })
      .addCase(fetchBasket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

// находим наш объект который уже существует в items
const defineItem = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


export const { getPaymentStatus, setPaymentStatus, giveTips, addItem, removeItem, clearItems, setItems, setPaymentMethod, setCheck, } = setBasket.actions;
export default setBasket.reducer;
