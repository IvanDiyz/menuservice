"use client";
import { store } from "@/store/store";
import "../styles/global.css";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationEvents from "@/components/NavigationEvents/NavigationEvents";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBasket } from "@/store/setBasket/basketApi";
import { useRouter } from "next/navigation";
import { setPaymentStatus } from "@/store/setBasket/setBasket";
import { managerOrderId, managerVenueId } from "@/store/menu/menuSlice";
import { fetchMenu } from "@/store/menu/menuApi";
import App from "@/components/App/App";

export default function RootLayout({ children }) {
 

  return (
    <Provider store={store}>
      {/* <html lang="en">
        <body>
          <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html> */}
      <App children={children}/>
    </Provider>
  );
}
