"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./PaymentMethod.module.scss";
import Tips from "../Tips/Tips";

const PaymentMethod = ({dispatchMethod}) => {
  const setHeightPay = useRef(null);
  const setHeightTips = useRef(null);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { choiceMethod } = selector(
    (state) => state.setOrder
  );
  const [email, setEmail] = useState("");
  const [activePayment, setActivePayment] = useState("cash");
  const [heightPay, setHeight] = useState();

  let emailClient = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (choiceMethod == "then") {
      setActivePayment("cash");
    }
    setHeight(setHeightPay.current?.scrollHeight + 1);
  }, [choiceMethod]);
  useEffect(() => {
    if (activePayment == "cash") {
      setHeight(115);
    } else {
      setHeight(335);
    }
    dispatch(dispatchMethod(activePayment))
  }, [activePayment]);

  const handlePaymentClick = (paymentMethod) => {
    setActivePayment(paymentMethod);
  };

  return (
    <div
      ref={setHeightPay}
      style={{
        height: choiceMethod === "now" ? `${heightPay}px` : "0",
      }}
      className={`${s.orderFooter__paymentBox} ${
        choiceMethod == "now" ? `${s.orderFooter__paymentBox__active}` : ""
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
              ? `${setHeightTips.current?.scrollHeight}px`
              : "0",
        }}
      >
        <Tips />
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
