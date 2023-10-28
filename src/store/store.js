import {
  Action,
  ThunkAction,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

// import { createWrapper } from 'next-redux-wrapper';
import menuReducer from "./menu/menuSlice";
import clientReducer from "./client/clientSlice";
import stateAsideReducer from "./stateAside/stateAside";
import getSections from "./getSections/getSections";
import getDishis from "./getDishis/getDishis";
import getSection from "./getSection/getSection";
import setSearch from "./setSearch/setSearch";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    client: clientReducer,
    stateAside: stateAsideReducer,
    getSections: getSections,
    getDishis: getDishis,
    getSection: getSection,
    setSearch: setSearch,
  },
});
