"use client";
import { store } from "@/store/store";
import s from "./App.module.scss";

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


export default function App({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { paymentStatus, isPaid, orderId } = selector(state => state.setBasket);
  const { tableId, venueId, orders } = selector(state => state.menu);
  useEffect(() => {
    console.log('мы в layout')
    const paymentStatusLocal = localStorage.getItem("paymentStatus");
    const venueId = localStorage.getItem("venueId");
    const tableId = localStorage.getItem("tableId");
    const ordersLocal = localStorage.getItem("orders");
    if (paymentStatusLocal == "true" && isPaid == null && ordersLocal !== null) {
      dispatch(fetchBasket(ordersLocal)).then(() => {
        const { isPaid } = store.getState().setBasket;
        console.log('isPaid', isPaid)
        if (!isPaid && paymentStatusLocal == "true") {
          router.push(`/${venueId}/${tableId}/basket`);
        }
        if (isPaid && paymentStatusLocal == "true") {
          debugger
          localStorage.removeItem("paymentStatus");
          localStorage.removeItem("orders");
          dispatch(setPaymentStatus(false));
        }
      });
    }
  }, [isPaid, paymentStatus, orders]);

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
    console.log(orders)
    if (orders == null && venueId !== null) {
      dispatch(fetchMenu({idvenue: venueId,idtable: tableId})).then(() => {
        const { orders } = store.getState().menu;
        localStorage.setItem('orders', orders)
      });
    } else {
      localStorage.setItem('orders', orders)
      dispatch(managerOrderId(orders))
    }
    
  }, [orders]);

  return (
    <html lang="en">
        <body>
          <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html>
  );
}
