"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./OrderBtn.module.scss";


const OrderBtn = ({ title, setData }) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const {paymentStatus} = selector(state => state.setBasket)
  const {error} = selector(state => state.getClientInfo)
  const {isDelivery} = selector(state => state.menu)
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
  if(isDelivery && error) {
    return (
      <div className={`${s.orderFooter__btn} ${s.orderFooter__btnWaiterWait}`}>
        <button disabled={true}>{title}</button>
      </div>
    );
  }
  return (
    <div className={`${s.orderFooter__btn} ${paymentStatus ? `${s.orderFooter__btnWaiterWait}` : ''}`}>
      <button onClick={observer} disabled={paymentStatus}>{title}</button>
    </div>
  );
};

export default OrderBtn;
