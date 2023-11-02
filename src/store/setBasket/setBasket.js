import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
  items: [],
  tipsBool: true,
  tips: '',
};

export const setBasket = createSlice({
  name: "setBasket",
  initialState,
  reducers: {
    changeQuantity: (state, action) => {
      let indexDish = state.items.findIndex(item => item.id === action.payload.id);
      state.items[indexDish].quantity = action.payload.quantity;
      state.items[indexDish].amount = (state.items[indexDish].dish.cost * action.payload.quantity).toString();
      action.payload.sign == 'plus' ?
      state.amount = (+state.amount + +state.items[indexDish].dish.cost).toString() :
      state.amount = (+state.amount - +state.items[indexDish].dish.cost).toString();
      // calculateAmount(state)
    },
    addDish: (state, action) => {
      state.items.push(action.payload);
      state.amount = (+state.amount + +action.payload.amount).toString();
      // calculateAmount(state)
    },
    deleteDish: (state, action) => {
      let indexDish = state.items.findIndex(item => item.id === action.payload.id);
      state.amount = (+state.amount - +state.items[indexDish].dish.cost).toString();
      state.items.splice(indexDish, 1)
      // calculateAmount(state)
    },
    giveTips: (state, action) => {
      state.tipsBool = action.payload.bool;
      state.tips = Math.floor(state.amount * (action.payload.actualTips / 100));
    }
  },
});

let calculateAmount = (state) => {
  // debugger
  let amountAll = 0;
  state.items.map(el => {
    amountAll = +el.amount + amountAll;
  })
  state.amount = amountAll.toString();
}

export const { changeQuantity, addDish, deleteDish, giveTips } = setBasket.actions;
export default setBasket.reducer;
