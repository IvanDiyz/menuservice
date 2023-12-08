"use client";
import { store } from "@/store/store";
import "../styles/global.css";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationEvents from "@/components/NavigationEvents/NavigationEvents";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { fetchBasket } from "@/store/setBasket/basketApi";
import { useRouter } from "next/navigation";
import { setPaymentStatus } from "@/store/setBasket/setBasket";
import { managerOrderId, managerVenueId } from "@/store/menu/menuSlice";
import { fetchMenu } from "@/store/menu/menuApi";

export default function RootLayout({ children }) {
  const router = useRouter();
  const dispatch = store.dispatch;
  const { paymentStatus, isPaid, orderId } = store.getState().setBasket;
  const { tableId, venueId, orders } = store.getState().menu;
  useEffect(() => {
    const paymentStatus = localStorage.getItem("paymentStatus");
    const venueId = localStorage.getItem("venueId");
    const tableId = localStorage.getItem("tableId");
    if (paymentStatus == "true") {
      dispatch(fetchBasket(orderId)).then(() => {
        const { isPaid } = store.getState().setBasket;
        if (!isPaid && paymentStatus == "true") {
          router.push(`/${venueId}/${tableId}/basket`);
        }
        if (isPaid && paymentStatus == "true") {
          localStorage.removeItem("paymentStatus");
          dispatch(setPaymentStatus(false));
        }
      });
    }
  }, [isPaid, paymentStatus]);

  useEffect(() => {
    if (venueId == null || tableId == null) {
      const venueId = localStorage.getItem("venueId");
      const tableId = localStorage.getItem("tableId");
      dispatch(managerVenueId({ venueId, tableId }));
    }
  }, [venueId, tableId]);

  useEffect(() => {
    const venueId = localStorage.getItem("venueId");
    const tableId = localStorage.getItem("tableId");
    if (orders == null && venueId !== null) {
      dispatch(fetchMenu({idvenue: venueId,idtable: tableId}));
    } else {
      localStorage.setItem('orders', orders)
      dispatch(managerOrderId(orders))
    }
    
  }, [orders]);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html>
    </Provider>
  );
}
