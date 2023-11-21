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
        if(!action.payload.pathName == `/${action.payload.venueId}/${action.payload.tableId}/order`) {
          obj.addons = action.payload.addons;
        }
        obj.amountDish = (+obj.dish.cost * action.payload.quantity);
        calculateAmout(obj);  
        obj.amount = obj.amountDish + obj.amountAddons;
      }
      if(action.payload.pathName == `/${action.payload.venueId}/${action.payload.tableId}/order`) {
        creatDish(state.items[action.payload.indexItem - 1]);
        state.amount = 0;
        state.items.map(el => {
          let amount = 0;
          amount = el.amount + amount;
          state.amount = amount + state.amount;
        })
      }
      if(!action.payload.indexItem) {
        creatDish(state.item)
      }
      
    },
    addDish: (state, action) => {
      state.item = action.payload;
      calculateAmout(state.item);  
      state.item.amount = state.item.amountDish + state.item.amountAddons;
      
    },
    deleteDish: (state, action) => {
      if(action.payload.pathName == `/${action.payload.venueId}/${action.payload.tableId}/order`) {
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
      if(state.items.length) {
        state.item.push = false;
        state.items.map(el => {
          if(el.id == state.item.id) {
            
            arraysAreEqual(state.item, el, state)
          }
        })
        if(!state.item.push){
          console.log('push 1');
          state.items.push(state.item);
          state.amount = state.amount + state.item.amount;
          state.item = {};
          state.addons = [];
        }
      } else {
        console.log('push 2');
        state.items.push(state.item);
        state.amount = state.amount + state.item.amount;
        state.item = {};
        state.addons = [];
      }
    },
    clearState: (state) => {
      state.item = {};
      state.addons = [];
    }
  },
});


let calculateAmout = (obj) => {
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

// функция сровнения массивов
function arraysAreEqual(array1, array2, state) {
  if (array1.addons.length !== array2.addons?.length) {
    console.log('совпадений нет')
    return false;
  }

  // Сортировка массивов по полю id перед сравнением
  const sortedArray1 = array1.addons.slice().sort((a, b) => a.id - b.id);
  const sortedArray2 = array2.addons.slice().sort((a, b) => a.id - b.id);

  // Сравнение отсортированных массивов
  if(JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2)) {
    
    console.log('массивы равны')
    array1.push = true;
    array2.quantity += array1.quantity
    array2.amountDish += array1.amountDish
    array2.amountAddons += array1.amountAddons
    array2.amount += array1.amount
    state.amount += array1.amount
    return
  }else {
    console.log('массивы не равны')
  };
}

export const { changeQuantity, addDish, deleteDish, giveTips, addonsQuantity, addAddons, deleteAddons, addBasket, clearState } = setBasket.actions;
export default setBasket.reducer;
