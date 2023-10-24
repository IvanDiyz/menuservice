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
import getParams from "./getStatuses/getParams";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    client: clientReducer,
    stateAside: stateAsideReducer,
    paramsClients: getParams,
  },
});
