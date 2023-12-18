"use client";
import { store } from "@/store/store";
import s from "./App.module.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationEvents from "@/components/NavigationEvents/NavigationEvents";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { setIsPaid, setPaymentStatus } from "@/store/setBasket/setBasket";
import { managerOrderId, managerVenueId } from "@/store/menu/menuSlice";
import { fetchMenu } from "@/store/menu/menuApi";

export default function App({ children }) {
  const [redirectStatus, setRedirect] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { paymentStatus, isPaid, orderId } = selector(
    (state) => state.setBasket
  );
  const { tableId, venueId, orders } = selector((state) => state.menu);
  useEffect(() => {
    const venueId = localStorage.getItem("venueId");
    const tableId = localStorage.getItem("tableId");
    const paymentStatusLocal = localStorage.getItem("paymentStatus");
    if (orders == null && venueId !== null) {
      dispatch(fetchMenu({ idvenue: venueId, idtable: tableId })).then(() => {
        const { orders } = store.getState().menu;
        if (orders == null && paymentStatusLocal === "true") {
          setRedirect(false);
          localStorage.removeItem("paymentStatus");
          localStorage.removeItem("orders");
          dispatch(setPaymentStatus(false));
        }
        localStorage.setItem("orders", orders);
      });
    } else {
      localStorage.setItem("orders", orders);
      dispatch(managerOrderId(orders));
    }
  }, [orders]);
  useEffect(() => {
    const paymentStatusLocal = localStorage.getItem("paymentStatus");
    const venueId = localStorage.getItem("venueId");
    const tableId = localStorage.getItem("tableId");
    if (!paymentStatus && paymentStatusLocal === "true") {
      dispatch(setPaymentStatus(true));
      return;
    }
    if (
      paymentStatusLocal == "true" &&
      typeof orders === 'number'
    ) {

        const { isPaid } = store.getState().setBasket;

        if (isPaid && paymentStatusLocal == "true") {
          localStorage.removeItem("paymentStatus");
          localStorage.removeItem("orders");
          dispatch(setPaymentStatus(false));
          dispatch(setIsPaid(null));
        }
        if (!isPaid && paymentStatusLocal == "true" && paymentStatus) {
          router.push(`/${venueId}/${tableId}/basket`);
        }
    }
    

  }, [isPaid, paymentStatus, orders, redirectStatus]);

  useEffect(() => {
    if (venueId == null || tableId == null) {
      const venueId = localStorage.getItem("venueId");
      const tableId = localStorage.getItem("tableId");
      dispatch(managerVenueId({ venueId, tableId }));
    }
  }, [venueId, tableId]);

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
