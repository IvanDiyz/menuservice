import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "../setOrder/orderApi";
import { fetchBasket } from "../setBasket/basketApi";
import { fetchMenu } from "../menu/menuApi";

const initialState = {
  allAmount: 0,
  paymentMethod: 1,
  check: 'payAll',
  items: [],
  status: false,
  orderId: null,
  tips: 0,
  isPaid: null,
  totalAmount: 0,
  responsDish: [],
  paymentStatus: false,
  totalDeclined: false,
};

export const setBasket = createSlice({
  name: "setBasket",
  initialState,
  reducers: {
    giveTips: (state, action) => {
      if (action.payload.inputTips) {
        state.tips = +action.payload.inputValue;
        state.allAmount = Math.ceil((state.totalAmount + state.tips) * 100) / 100;
      } else {
        state.tips = Math.floor(
          state.totalAmount * (action.payload.actualTips / 100)
        );
        state.allAmount = Math.ceil((state.totalAmount + state.tips) * 100) / 100;
      }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      state.tips = 0;
    },
    setIsPaid: (state, action) => {
      state.isPaid = action.payload;
    },
    resetState: (state, action) => {
      state.items = [];
      state.responsDish = [];
    },
    removeId: (state, action) => {
      state.orderId = null;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
      
    },
    getPaymentStatus: (state, action) => {
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
        state.isPaid = isPaid;
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
        if(action.payload.isPaid || action.payload.length <= 0) {
          Object.assign(state, initialState);
          state.isPaid = action.payload.isPaid;
        } else {
          const {id, totalAmount, isPaid, dishes, tips, orderPaymentMethodId} = action.payload
          state.data = action.payload;
          state.responsDish = dishes;
          state.items = dishes;
          state.status = "succeeded";
          state.orderId = id;
          state.tips = +tips;
          state.paymentMethod = orderPaymentMethodId;
          state.isPaid = isPaid; // не забыть поменять на isPaid
          state.totalAmount = +totalAmount;
          const sumDeclined = dishes.reduce((acc, obj) => {
            if (obj.dishStatusId === 6) {
              acc += +obj.amount;
            }
            return acc;
          }, 0);
          
          state.totalDeclined = sumDeclined;
        }
      })
      .addCase(fetchBasket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        if(action.payload.response?.orders[0]) {
          state.orderId = action.payload.response?.orders[0]?.id;
        }
      })
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
      
});

// находим наш объект который уже существует в items
const defineItem = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


export const { removeId, resetState, setIsPaid, getPaymentStatus, setPaymentStatus, giveTips, addItem, removeItem, clearItems, setItems, setPaymentMethod, setCheck, } = setBasket.actions;
export default setBasket.reducer;
