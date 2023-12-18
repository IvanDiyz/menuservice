"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./BasketFooter.module.scss";
import Total from "@/components/Total/Total";
import { useEffect, useRef, useState } from "react";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
import OrderBtn from "@/components/OrderBtn/OrderBtn";
import {
  getPaymentStatus,
  giveTips,
  setPaymentMethod,
  setPaymentStatus,
} from "@/store/setBasket/setBasket";
import { changeChoice } from "@/store/setOrder/setOrder";
import { fetchBasket } from "@/store/setBasket/basketApi";
import { orderNotificate } from "@/store/notificate/notificateApi";

export default function BasketFooter() {
  let localPaymentStatus;
  if (typeof window !== "undefined") {
    if (window.localStorage) {
      localPaymentStatus = localStorage.getItem("paymentStatus");
    }
  }
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const {
    totalAmount,
    isPaid,
    orderId,
    items,
    allAmount,
    tips,
    paymentStatus,
    paymentMethod,
  } = selector((state) => state.setBasket);
  const [totalItems, setTotalItems] = useState(totalAmount);

  const objMethod = {
    '1': 'CASH',
    '2': 'TERMINAL',
    '3': 'ONLINE',
  }

  const paymnet = () => {
    dispatch(
      orderNotificate({
        request: {
          request: objMethod[paymentMethod]
        },
        orderId: orderId,
        patchOrder: {
          "paymentMethodId": paymentMethod,
          "tips": tips,
        }
      })
    );
    dispatch(setPaymentStatus(true));
    localStorage.setItem("paymentStatus", true);
  };

  useEffect(() => {
    if (localPaymentStatus) {
      if (isPaid && localPaymentStatus == "true") {
        dispatch(setPaymentStatus(false));
      }
      dispatch(getPaymentStatus(localPaymentStatus));
    }
  }, [localPaymentStatus]);

  useEffect(() => {
    setTotalItems(allAmount);
    dispatch(changeChoice("now"));
    if (typeof orderId === 'number') {
      dispatch(fetchBasket(orderId));
    }
  }, [orderId]);

  useEffect(() => {
    let total = 0;
    items.map((el) => {
      if (el.dishStatusId != 6) total += +el.amount;
    });
    setTotalItems(total + tips);
  }, [items, tips]);

  if (orderId) {
    return (
      <div className={s.orderFooter}>
        <Total total={totalItems} />
        <PaymentMethod
          tips={tips}
          tipsDispatch={giveTips}
          dispatchMethod={setPaymentMethod}
          amount={totalAmount}
        />
        <OrderBtn
          title={`${
            paymentStatus ? "Очікуйте підтвердження оплати" : "Сплатити"
          }`}
          setData={paymnet}
        />
      </div>
    );
  }
}
