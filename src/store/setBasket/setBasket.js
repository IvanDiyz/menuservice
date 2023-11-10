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
      state.item.amount = (state.item.dish.cost * action.payload.quantity).toString();
      action.payload.sign == 'plus' ?
      state.amount = (+state.amount + +state.item.dish.cost).toString() :
      state.amount = (+state.amount - +state.item.dish.cost).toString();
      
    },
    addDish: (state, action) => {
      state.item = action.payload;
      state.amount = (+state.amount + +action.payload.amount).toString();
    
    },
    deleteDish: (state, action) => {
      state.amount = (+state.amount - +state.item.dish.cost).toString();
      state.item = {};
      
    },
    addonsQuantity: (state, action) => {
      let indexAddons = state.addons.findIndex(item => item.id === action.payload.id);
      state.addons[indexAddons].quantity = action.payload.quantity;
      state.item.addons = state.addons;
      state.addons[indexAddons].amount = (state.addons[indexAddons].amount * action.payload.quantity).toString();
    },
    addAddons: (state, action) => {
      state.addons.push(action.payload);   
      if(state.item.addons) {
        state.item.addons = state.addons; 
      }
    },
    deleteAddons: (state, action) => {
      let indexDish = state.addons.findIndex(item => item.id === action.payload.id);
      state.item.addons = state.addons;
      state.addons.splice(indexDish, 1)
      
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


export const { changeQuantity, addDish, deleteDish, giveTips, addonsQuantity, addAddons, deleteAddons, addBasket, clearState } = setBasket.actions;
export default setBasket.reducer;
