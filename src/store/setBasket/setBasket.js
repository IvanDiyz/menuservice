import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
  item: {},
  items: [],
  addons: [],
  tipsBool: true,
  tips: '',
};

export const setBasket = createSlice({
  name: "setBasket",
  initialState,
  reducers: {
    changeQuantity: (state, action) => {
      state.item.quantity = action.payload.quantity;
      state.item.addons = action.payload.addons;
      state.item.amountDish = (+state.item.dish.cost * action.payload.quantity);
      action.payload.sign == 'plus' ?
      state.amount = (+state.amount + +state.item.dish.cost) :
      state.amount = (+state.amount - +state.item.dish.cost);
      calculateAmout(state);  
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    addDish: (state, action) => {
      state.item = action.payload;
      state.amount = (+state.amount + +action.payload.amount);
      calculateAmout(state);  
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    
    },
    deleteDish: (state, action) => {
      state.amount = (+state.amount - +state.item.dish.cost);
      state.item = {};
      calculateAmout(state);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    addonsQuantity: (state, action) => {
      let indexAddons = state.addons.findIndex(item => item.id === action.payload.id);
      state.addons[indexAddons].quantity = action.payload.quantity;
      state.item.addons = state.addons;
      state.addons[indexAddons].amount = +(state.addons[indexAddons].startAmount * action.payload.quantity).toString();
      calculateAmout(state);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    addAddons: (state, action) => {
      state.addons.push(action.payload);   
      let indexAddons = state.addons.findIndex(item => item.id === action.payload.id);
      state.addons[indexAddons].amount = +(state.addons[indexAddons].startAmount * action.payload.quantity).toString();
      if(state.item.addons) {
        state.item.addons = state.addons; 
      }
      calculateAmout(state);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    deleteAddons: (state, action) => {
      let indexDish = state.addons.findIndex(item => item.id === action.payload.id);
      state.item.addons = state.addons;
      state.addons.splice(indexDish, 1)
      calculateAmout(state);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    giveTips: (state, action) => {
      console.log(action)
      if(action.payload.inputTips) {
        state.tips = action.payload.inputValue;
      } else {
        state.tipsBool = action.payload?.bool;
        state.tips = Math.floor(state.amount * (action.payload.actualTips / 100));
      }
    },
    addBasket: (state, action) => {
      state.items.push(state.item)
      state.item = {};
      state.addons = [];
    },
    clearState: (state) => {
      state.item = {};
      state.addons = [];
    }
  },
});


let calculateAmout = (state) => {
  let amount = 0;
  if(state.item.addons?.length > 0) {
    state.item.addons.map(el => {
      amount = amount + el.amount;
    })
    state.item.amountAddons = amount * state.item?.quantity;
  } else {
    state.item.amountAddons = 0;
  }
}

export const { changeQuantity, addDish, deleteDish, giveTips, addonsQuantity, addAddons, deleteAddons, addBasket, clearState } = setBasket.actions;
export default setBasket.reducer;
