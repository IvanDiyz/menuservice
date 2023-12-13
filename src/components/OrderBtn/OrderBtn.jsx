"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./OrderBtn.module.scss";


const OrderBtn = ({ title, setData }) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const {paymentStatus} = selector(state => state.setBasket)
  const [click, changeClick] = useState(false);

  useEffect(() => {
    if(click) {
      localStorage.removeItem("items");
      localStorage.removeItem("amount");
      setData()
    }
  }, [click])

  const observer = () => {
    changeClick(true)
  }

  return (
    <div className={`${s.orderFooter__btn} ${paymentStatus ? `${s.orderFooter__btnWaiterWait}` : ''}`}>
      <button onClick={observer} disabled={paymentStatus}>{title}</button>
    </div>
  );
};

export default OrderBtn;
