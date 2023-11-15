import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
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
      let creatDish = (obj) => {
        obj.quantity = action.payload.quantity;
        if(!action.payload.pathName == '/order') {
          obj.addons = action.payload.addons;
        }
        obj.amountDish = (+obj.dish.cost * action.payload.quantity);
        calculateAmout(obj);  
        obj.amount = obj.amountDish + obj.amountAddons;
      }
      if(action.payload.pathName == '/order') {
        creatDish(state.items[action.payload.indexItem - 1]);
        state.amount = 0;
        state.items.map(el => {
          let amount = 0;
          amount = el.amount + amount;
          state.amount = amount + state.amount;
        })
        // state.items[action.payload.indexItem - 1].quantity = action.payload.quantity;
        // state.items[action.payload.indexItem - 1].amount = (+state.items[action.payload.indexItem - 1].dish.cost + state.items[action.payload.indexItem - 1].amountAddons) * state.items[action.payload.indexItem - 1].quantity;
      }
      if(!action.payload.indexItem) {
        creatDish(state.item)
        // state.item.quantity = action.payload.quantity;
        // state.item.addons = action.payload.addons;
        // state.item.amountDish = (+state.item.dish.cost * action.payload.quantity);
        // calculateAmout(state);  
        // state.item.amount = state.item.amountDish + state.item.amountAddons;
      }
      
    },
    addDish: (state, action) => {
      state.item = action.payload;
      calculateAmout(state.item);  
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    
    },
    deleteDish: (state, action) => {
      // state.amount = (+state.amount - +state.item.dish.cost);
      if(action.payload.pathName == '/order') {
        state.items.splice(action.payload.indexItem -1, 1)
        state.amount = 0;
        state.items.map(el => {
          let amount = 0;
          amount = el.amount + amount;
          state.amount = amount + state.amount;
        })
      }
      state.item = {};
      calculateAmout(state.item);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    addonsQuantity: (state, action) => {
      let indexAddons = state.addons.findIndex(item => item.id === action.payload.id);
      state.addons[indexAddons].quantity = action.payload.quantity;
      state.item.addons = state.addons;
      state.addons[indexAddons].amount = +(state.addons[indexAddons].startAmount * action.payload.quantity).toString();
      calculateAmout(state.item);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    addAddons: (state, action) => {
      state.addons.push(action.payload);   
      let indexAddons = state.addons.findIndex(item => item.id === action.payload.id);
      state.addons[indexAddons].amount = +(state.addons[indexAddons].startAmount * action.payload.quantity).toString();
      if(state.item.addons) {
        state.item.addons = state.addons; 
      }
      calculateAmout(state.item);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    deleteAddons: (state, action) => {
      let indexDish = state.addons.findIndex(item => item.id === action.payload.id);
      state.item.addons = state.addons;
      state.addons.splice(indexDish, 1)
      calculateAmout(state.item);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    giveTips: (state, action) => {
      if(action.payload.inputTips) {
        state.tips = action.payload.inputValue;
      } else {
        state.tipsBool = action.payload?.bool;
        state.tips = Math.floor(state.amount * (action.payload.actualTips / 100));
      }
    },
    addBasket: (state, action) => {
      state.items.push(state.item);
      state.amount = state.amount + state.item.amount;
      state.item = {};
      state.addons = [];
    },
    clearState: (state) => {
      state.item = {};
      state.addons = [];
    }
  },
});


let calculateAmout = (obj) => {
  console.log(obj?.quantity);
  let amount = 0;
  if(obj.addons?.length > 0) {
    obj.addons.map(el => {
      amount = amount + el.amount;
    })
    obj.amountAddons = amount * obj?.quantity;
  } else {
    obj.amountAddons = 0;
  }
}
// let calculateAmout = (state) => {
//   let amount = 0;
//   if(state.item.addons?.length > 0) {
//     state.item.addons.map(el => {
//       amount = amount + el.amount;
//     })
//     state.item.amountAddons = amount * state.item?.quantity;
//   } else {
//     state.item.amountAddons = 0;
//   }
// }

export const { changeQuantity, addDish, deleteDish, giveTips, addonsQuantity, addAddons, deleteAddons, addBasket, clearState } = setBasket.actions;
export default setBasket.reducer;
