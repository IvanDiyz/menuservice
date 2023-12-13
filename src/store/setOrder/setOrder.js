import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "./orderApi";
import { fetchMenu } from "../menu/menuApi";

const initialState = {
  allAmount: 0,
  amount: 0,
  item: {},
  items: [],
  addons: [],
  tips: 0,
  choiceMethod: false,
  delivery: false,
  paymentMethod: "",
  status: false,
  orderId: false,
};

export const setOrder = createSlice({
  name: "setOrder",
  initialState,
  reducers: {
    updateItem: (state, action) => {
      const mergedObject = {
        ...state.items[action.payload.indexItem - 1],
        ...action.payload.item,
      };
      state.items[action.payload.indexItem - 1] = mergedObject;
      state.items[action.payload.indexItem - 1].clientCooment = action.payload.text;
      state.items[action.payload.indexItem - 1].update = true;
    },
    setStatus: (state, action) => {
      state.status = false;
    },
    deleteItem: (state, action) => {
      state.items.splice(action.payload -1, 1)
    },
    managerItems: (state, action) => {
      state.items = action.payload.items;
      state.amount = action.payload.amount;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      state.tips = 0;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    clearItems: (state, action) => {
      state.items = [];
      state.allAmount = 0;
      state.amount = 0;
      state.tips = 0;
    },
    changeChoice: (state, action) => {
      state.choiceMethod = action.payload;
    },
    changeQuantity: (state, action) => {
      // debugger
      let creatDish = (obj) => {
        obj.quantity = action.payload.quantity;
        if (
          !action.payload.pathName ==
          `/${action.payload.venueId}/${action.payload.tableId}/order`
        ) {
          obj.addons = action.payload.addons;
        }
        obj.amountDish = Math.round(+obj.priceDicount * action.payload.quantity * 100) / 100;
        calculateAmout(obj);
        obj.amount = obj.amountDish + obj.amountAddons;
      };
      if (
        action.payload.pathName ==
        `/${action.payload.venueId}/${action.payload.tableId}/order` && action.payload.indexItem
      ) {
        creatDish(state.items[action.payload.indexItem - 1]);
        state.amount = 0;
        state.items.map((el) => {
          let amount = 0;
          amount = el.amount + amount;
          state.amount = amount + state.amount;
        });
      }
      if (!action.payload.indexItem) {
        creatDish(state.item);
      }
    },
    addDish: (state, action) => {
      state.item = action.payload;
      calculateAmout(state.item);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    deleteDish: (state, action) => {
      if (
        action.payload.pathName ==
        `/${action.payload.venueId}/${action.payload.tableId}/order`
      ) {
        state.items.splice(action.payload.indexItem - 1, 1);
        state.amount = 0;
        state.items.map((el) => {
          let amount = 0;
          amount = el.amount + amount;
          state.amount = amount + state.amount;
        });
        state.addons = [];
      }
      state.item = {};
      calculateAmout(state.item);
      state.item.amount = state.item.amountDish + state.item.amountAddons;
    },
    addonsQuantity: (state, action) => {
      let indexAddons = state.addons.findIndex(
        (item) => item.id === action.payload.id
      );
      state.addons[indexAddons].quantity = action.payload.quantity;
      state.item.addons = state.addons;
      state.addons[indexAddons].amount = +(
        state.addons[indexAddons].startAmount * action.payload.quantity
      ).toString();
      calculateAmout(state.item);
      state.item.amount = Math.ceil((state.item.amountDish + state.item.amountAddons) * 100) / 100;
    },
    addAddons: (state, action) => {
      state.addons.push(action.payload);
      let indexAddons = state.addons.findIndex(
        (item) => item.id === action.payload.id
      );
      state.addons[indexAddons].amount = +(
        state.addons[indexAddons].startAmount * action.payload.quantity
      ).toString();
      if (state.item.addons) {
        state.item.addons = state.addons;
      }
      calculateAmout(state.item);
      state.item.amount = Math.ceil((state.item.amountDish + state.item.amountAddons) * 100) / 100;
    },
    deleteAddons: (state, action) => {
      let indexDish = state.addons.findIndex(
        (item) => item.id === action.payload.id
      );
      state.item.addons = state.addons;
      state.addons.splice(indexDish, 1);
      calculateAmout(state.item);
      state.item.amount = Math.ceil((state.item.amountDish + state.item.amountAddons) * 100) / 100;
    },
    giveTips: (state, action) => {
      if (action.payload.inputTips) {
        state.tips = +action.payload.inputValue;
        state.allAmount = state.amount + state.tips;
      } else {
        state.tips = Math.floor(
          state.amount * (action.payload.actualTips / 100)
        );
        state.allAmount = state.amount + state.tips;
      }
    },
    addBasket: (state, action) => {
        state.item.clientCooment = action.payload;
        state.items.push(state.item);
        state.amount = state.amount + state.item.amount;
        state.item = {};
        state.addons = [];
    },
    clearState: (state) => {
      state.item = {};
      state.addons = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        console.log(action.payload)
        Object.assign(state, initialState);
        state.status = "succeeded";
        state.orderId = action.payload.id;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.orderId = action.payload.response.orders[0].id;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

let calculateAmout = (obj) => {
  let amount = 0;
  if (obj.addons?.length > 0) {
    obj.addons.map((el) => {
      amount = amount + el.amount;
    });
    obj.amountAddons = amount * obj?.quantity;
  } else {
    obj.amountAddons = 0;
  }
};


export const {
  deleteItem,
  updateItem,
  managerItems,
  setStatus,
  setPaymentMethod,
  setDelivery,
  clearItems,
  changeChoice,
  changeQuantity,
  addDish,
  deleteDish,
  giveTips,
  addonsQuantity,
  addAddons,
  deleteAddons,
  addBasket,
  clearState,
} = setOrder.actions;
export default setOrder.reducer;
