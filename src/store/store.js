import {
  configureStore,
} from "@reduxjs/toolkit";

import menuReducer from "./menu/menuSlice";
import stateAsideReducer from "./stateAside/stateAside";
import getSections from "./getSections/getSections";
import getDishis from "./getDishis/getDishis";
import getSection from "./getSection/getSection";
import setSearch from "./setSearch/setSearch";
import setFilter from "./setFilter/setFilter";
import setOrder from "./setOrder/setOrder";
import setBasket from "./setBasket/setBasket";
import notificate from "./notificate/notificate";



export const store = configureStore({
  reducer: {
    menu: menuReducer,
    stateAside: stateAsideReducer,
    getSections: getSections,
    getDishis: getDishis,
    getSection: getSection,
    setSearch: setSearch,
    setFilter: setFilter,
    setOrder: setOrder,
    setBasket: setBasket,
    notificate: notificate,
  },
});


