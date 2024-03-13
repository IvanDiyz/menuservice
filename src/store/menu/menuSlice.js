import { createSlice } from "@reduxjs/toolkit";
import { fetchMenu } from "./menuApi";
import { fetchOrder } from "../setOrder/orderApi";

const initialState = {
  titleMethod: 'В закладі',
  titleTable: null,
  methodOrder: false,
  isDelivery: false,
  venueId: null,
  tableId: null,
  tableUId: null,
  menus: [],
  name: null,
  logoUrl: null,
  photoUrl: null,
  types: [],
  isLoading: 'nune',
  facebook: null,
  instagram: null,
  website: null,
  phone: null,
  extraPhone: null,
  description: null,
  address: null,
  orders: null,
  status: null,
  popup: false,
  licenseType: null,
  orderMethod: false,
  totalOrderMethod: null,
  activeOrderMethod: 1,
  paidMethod: false,
  totalPaidMethod: null,
  activePaidMethod: 1,
  openingTime: null,
  closingTime: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMethodOrder: (state, action) => {
      state.methodOrder = action.payload;
      state.titleMethod = action.payload ? 'Із собою' : 'В закладі';
      if(action.payload === 'delivery') {
        state.isDelivery = true;
        state.titleMethod = 'Доставка';
      } else {
        state.isDelivery = false;
      }
    },
    managerVenueId: (state, action) => {
      state.venueId = action.payload.venueId;
      // state.tableId = +action.payload.tableId;
      state.tableUId = action.payload.tableId;
    },
    managerOrderId: (state, action) => {
      state.orders = action.payload;
    },
    popupState: (state, action) => {
      state.popup = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.error = "";
        const { workingDays, desk, orders, licenseType, menus, name, logoUrl, photoUrl, types, facebook, instagram, website, phone, extraPhone, description, address } = action.payload.response;
        state.menus = menus;
        state.titleTable = desk.title;
        state.name = name;
        state.logoUrl = logoUrl;
        state.photoUrl = photoUrl;
        state.types = types;
        state.licenseType = licenseType;
        state.venueId = action.payload.venueId; //ожидаем что в ответе будет id
        state.tableId = desk.id;
        state.facebook = facebook;
        state.instagram = instagram;
        state.website = website;
        state.phone = phone;
        state.extraPhone = extraPhone;
        state.description = description;
        state.address = address;
        if(action.payload.response?.orders[0]) {
          state.orders = action.payload.response?.orders[0]?.id;
        }
        let arrOrders = [licenseType?.isInPlaceOn, licenseType?.isDeliveryOn, licenseType?.isToGoOn]
        let arrPaids = [licenseType?.isPayByCashOn, licenseType?.isPayByTerminalOn, licenseType?.isPayOnlineOn]
        state.orderMethod = checkDeliveryOptions(state, arrOrders, 'totalOrderMethod', 'activeOrderMethod');
        state.paidMethod = checkDeliveryOptions(state, arrPaids, 'totalPaidMethod', 'activePaidMethod');
        scheduleАnalysis(workingDays, state)
      })
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const {id, totalAmount, isPaid} = action.payload
        state.orders = id;
        state.isPaid = isPaid;
        state.totalAmount = +totalAmount;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

function checkDeliveryOptions(state, arr, total, active) {

  const enabledCount = arr.filter(Boolean).length;
  state[total] = enabledCount;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      state[active] = i+1;
      break;
    }
  }
  active === 'activeOrderMethod' && setFirstMethod(state);
  return enabledCount >= 2;
}

const setFirstMethod = (state) => {
  const methodOrder = {
    '1': {
      title: 'В закладі',
      method: false,
    },
    '2': {
      title: 'Доставка',
      method: true,
    },
    '3': {
      title: 'Із собою',
      method: true,
    }
  }
  if(state.activeOrderMethod !== 2) {
    state.titleMethod = methodOrder[state.activeOrderMethod].title;
    state.methodOrder = methodOrder[state.activeOrderMethod].method;
  } else {
    state.titleMethod = methodOrder[state.activeOrderMethod].title;
    state.methodOrder = false;
    state.isDelivery = methodOrder[state.activeOrderMethod].method;
  }
}

const scheduleАnalysis = (workingDays, state) => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  const openingHours = JSON.parse(workingDays);
  const daysOfWeek = Object.keys(openingHours);
  const today = new Date().toLocaleString('en', { weekday: 'short' }).toLowerCase();
  
  let prevDayToday = false; 
  let openingHoursArray = [];

  daysOfWeek.forEach((day, index) => {
    const openingTime = openingHours[day].openingTime;
    let closingTime = openingHours[day].closingTime;
    
    if (index > 0 && day === today && closingTime && currentTime < openingHours[daysOfWeek[index - 1]].closingTime && currentTime < openingTime) {
      openingHoursArray[index - 1].today = true;
      prevDayToday = true;
    }

    let todayFlag = !prevDayToday && day === today;


    openingHoursArray.push({
      dayOfWeek: day,
      openingTime: openingTime,
      closingTime: closingTime,
      today: todayFlag
    });

    prevDayToday = prevDayToday && !todayFlag;
  });

  const todayOpeningHours = openingHoursArray.find(day => day.dayOfWeek === today);

  state.daysWeek = openingHoursArray;
  state.openingTime = todayOpeningHours ? todayOpeningHours.openingTime : null;
  state.closingTime = todayOpeningHours ? todayOpeningHours.closingTime : null;
}

export const { popupState, managerOrderId, managerVenueId, setMethodOrder } = menuSlice.actions;
export default menuSlice.reducer;
