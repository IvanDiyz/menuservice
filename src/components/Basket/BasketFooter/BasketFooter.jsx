"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./BasketFooter.module.scss";
import Total from "@/components/Total/Total";
import { useEffect, useRef, useState } from "react";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
import { setPaymentMethod } from "@/store/setBasket/setBasket";
import { changeChoice } from "@/store/setOrder/setOrder";

export default function BasketFooter() {
  const dispath = useAppDispatch();
  const selector = useAppSelector;
  const { allAmount } = selector(
    (state) => state.setOrder
  );

  useEffect(() => {
    dispath(changeChoice('now'))
  }, [])

  return (
    <div className={s.orderFooter}>
      <Total total={allAmount} />
      <PaymentMethod dispatchMethod={setPaymentMethod}/>

      <div className={s.orderFooter__btn}>
        <button>Замовити</button>
      </div>
    </div>
  );
}
