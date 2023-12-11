"use client";
import { store } from "@/store/store";
import "../styles/global.css";

import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "@/components/App/App";

export default function RootLayout({ children }) {
 

  return (
    <Provider store={store}>
      <App children={children}/>
    </Provider>
  );
}
