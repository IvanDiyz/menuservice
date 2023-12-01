"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./OrderBtn.module.scss";


const OrderBtn = ({ title, setData }) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const {paymentStatus} = selector(state => state.setBasket)

  return (
    <div className={s.orderFooter__btn}>
      <button onClick={setData} disabled={paymentStatus}>{title}</button>
    </div>
  );
};

export default OrderBtn;
