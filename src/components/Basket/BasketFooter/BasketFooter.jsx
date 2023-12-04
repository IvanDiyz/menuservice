"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./BasketFooter.module.scss";
import Total from "@/components/Total/Total";
import { useEffect, useRef, useState } from "react";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
import OrderBtn from "@/components/OrderBtn/OrderBtn";
import { getPaymentStatus, giveTips, setPaymentMethod, setPaymentStatus } from "@/store/setBasket/setBasket";
import { changeChoice } from "@/store/setOrder/setOrder";
import { fetchBasket } from "@/store/setBasket/basketApi";

export default function BasketFooter() {
  let localPaymentStatus;
  if (typeof window !== 'undefined') {
    if(window.localStorage) {
      localPaymentStatus = localStorage.getItem('paymentStatus');
    }
  }
  const dispath = useAppDispatch();
  const selector = useAppSelector;
  const { totalAmount, isPaid, orderId, items, allAmount, tips, paymentStatus } = selector(
    (state) => state.setBasket
  );
  const [totalItems, setTotalItems] = useState(totalAmount);
  

  const paymnet = () => {
    console.log(localPaymentStatus)
    dispath(setPaymentStatus(true))
    localStorage.setItem('paymentStatus', true);
  }

  useEffect(() => {
    if(localPaymentStatus) {
      if(isPaid && localPaymentStatus == 'true') {
        dispath(setPaymentStatus(false))
      }
      dispath(getPaymentStatus(localPaymentStatus))
    }
  }, [localPaymentStatus])

  useEffect(() => {
    setTotalItems(allAmount)
    dispath(changeChoice("now"));
    if (orderId) {
      dispath(fetchBasket(orderId));
    }
  }, []);

  useEffect(() => {
    let total = 0;
    items.map((el) => {
      if(el.dishStatusId != 6)
      total += +el.amount;
    });
    setTotalItems(total + tips)
  }, [items, tips]);

  if (orderId) {
    return (
      <div className={s.orderFooter}>
        <Total total={totalItems} />
        <PaymentMethod tips={tips} tipsDispatch={giveTips} dispatchMethod={setPaymentMethod} amount={totalAmount}/>
        <OrderBtn title={"Сплатити"} setData={paymnet}/>
      </div>
    );
  }
}
