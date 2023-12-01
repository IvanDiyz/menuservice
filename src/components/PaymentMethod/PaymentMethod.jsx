"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./PaymentMethod.module.scss";
import Tips from "../Tips/Tips";

const PaymentMethod = ({tips, dispatchMethod, amount, tipsDispatch}) => {
  const setHeightPay = useRef(null);
  const setHeightTips = useRef(null);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { choiceMethod } = selector(
    (state) => state.setOrder
  );
  const { paymentStatus } = selector(
    (state) => state.setBasket
  );
  const [email, setEmail] = useState("");
  const [activePayment, setActivePayment] = useState("cash");
  const [heightPay, setHeight] = useState();

  let emailClient = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (!choiceMethod) {
      setActivePayment("cash");
    }
    // setHeight((setHeightPay.current?.scrollHeight / 3.4));
    setHeight(31);
  }, [choiceMethod]);
  useEffect(() => {
    if (activePayment == "cash") {
      setHeight(31);
    } else {
      setHeight(83.4);
    }
    dispatch(dispatchMethod(activePayment))
  }, [activePayment]);

  const handlePaymentClick = (paymentMethod) => {
    if(paymentStatus) {
      return
    }
    setActivePayment(paymentMethod);
  };

  return (
    <div
      ref={setHeightPay}
      style={{
        height: choiceMethod ? `${heightPay}vw` : "0",
      }}
      className={`${s.orderFooter__paymentBox} ${
        choiceMethod  ? `${s.orderFooter__paymentBox__active}` : ""
      }`}
    >
      <div className={s.orderFooter__payment}>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === "cash" ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick("cash")}
        >
          Готівка
        </span>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === "terminal" ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick("terminal")}
        >
          Термінал
        </span>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === "online" ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick("online")}
        >
          Онлайн
        </span>
      </div>
      <div
        className={s.orderFooter__tips}
        ref={setHeightTips}
        style={{
          height:
            activePayment != "cash"
              // ? `${setHeightTips.current?.scrollHeight / 3.8}vw`
              ? `${52}vw`
              : "0",
        }}
      >
        <Tips tips={tips} tipsDispatch={tipsDispatch} amount={amount}/>
      </div>
      <input
        className={s.orderFooter__emailInput}
        type="email"
        value={email}
        onChange={emailClient}
        placeholder="Введіть свій E-mail... Фіскальний чек"
      />
    </div>
  );
};

export default PaymentMethod;
