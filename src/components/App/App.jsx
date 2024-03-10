"use client";
import { store } from "@/store/store";
import s from "./App.module.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationEvents from "@/components/NavigationEvents/NavigationEvents";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useParams, useRouter } from "next/navigation";
import { setIsPaid, setPaymentStatus } from "@/store/setBasket/setBasket";
import { managerOrderId, managerVenueId, setMethodOrder } from "@/store/menu/menuSlice";
import { fetchMenu } from "@/store/menu/menuApi";

export default function App({ children }) {
  const [redirectStatus, setRedirect] = useState(true);
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { paymentStatus, isPaid, orderId } = selector(
    (state) => state.setBasket
  );
  const { tableId, venueId, orders, methodOrder, popup } = selector((state) => state.menu);
  const { stateSearch } = selector((state) => state.setSearch);

  useEffect(() => {
    if (venueId == null || tableId == null) {
      dispatch(managerVenueId({ venueId: params.idvenue, tableId: params.idtable }));
    }
  }, [venueId, tableId]);
  
  useEffect(() => {
    //setting the date in the local store
    const currentDate = new Date();
    const storedDateString = localStorage.getItem('currentDate');
    if(storedDateString != null) {
      const storedDate = new Date(storedDateString);
      //calculate the difference in milliseconds
      const timeDifference = currentDate - storedDate;
      //determine if the difference is greater than 24 hours
      const isMoreThan24Hours = timeDifference > 24 * 60 * 60 * 1000;
      if (isMoreThan24Hours) {
        localStorage.clear();
        //converting a date to a string
        const dateString = currentDate.toISOString();
        localStorage.setItem('currentDate', dateString);
      }
    } else {
      //converting a date to a string
      const dateString = currentDate.toISOString();
      localStorage.setItem('currentDate', dateString);
    }


    //checking the establishment and table
    const venueIdLocal = localStorage.getItem("venueId");
    const tableIdLocal = localStorage.getItem("tableId");
    if (params.idtable !== tableIdLocal || params.idvenue !== venueIdLocal) {
      localStorage.clear();
      //converting a date to a string
      const dateString = currentDate.toISOString();
      localStorage.setItem('currentDate', dateString);
    }

    const venueId = params.idvenue;
    const tableId = params.idtable;
    localStorage.setItem("venueId", venueId);
    localStorage.setItem("tableId", tableId);
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
    if (!paymentStatus && paymentStatusLocal === "true") {
      dispatch(setPaymentStatus(true));
      return;
    }
    if (paymentStatusLocal == "true" && typeof orders === "number") {
      const { isPaid } = store.getState().setBasket;

      if (isPaid && paymentStatusLocal == "true") {
        localStorage.removeItem("paymentStatus");
        localStorage.removeItem("orders");
        dispatch(setPaymentStatus(false));
        dispatch(setIsPaid(null));
      }
      if (!isPaid && paymentStatusLocal == "true" && paymentStatus) {
        router.push(`/${params.idvenue}/${params.idtable}/basket`);
      }
    }
  }, [isPaid, paymentStatus, orders, redirectStatus]);

  useEffect(() => {
    const methodOrderLocal = localStorage.getItem("methodOrder");
    if(methodOrderLocal !== methodOrder && methodOrderLocal != null) {
      dispatch(setMethodOrder(methodOrderLocal === 'delivery' ? methodOrderLocal: JSON.parse(methodOrderLocal)))
    }
  }, [])


  return (
    <html lang="en">
      <body  className={`${s.app} ${stateSearch || popup ? s.app__open : s.app__close}`}>
        <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
