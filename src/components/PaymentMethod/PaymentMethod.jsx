"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./PaymentMethod.module.scss";
import Tips from "../Tips/Tips";
import DeliveryForm from "../DeliveryForm/DeliveryForm";

const PaymentMethod = ({tips, dispatchMethod, amount, tipsDispatch, form}) => {
  const setHeightPay = useRef(null);
  const setHeightTips = useRef(null);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { isDelivery } = selector(
    (state) => state.menu
  );
  const { choiceMethod, paymentMethod } = selector(
    (state) => state.setOrder
  );
  const { paymentStatus } = selector(
    (state) => state.setBasket
  );
  const [email, setEmail] = useState("");
  const [activePayment, setActivePayment] = useState(1);
  const [heightPay, setHeight] = useState();

  let emailClient = (e) => {
    if(paymentStatus) return
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (!choiceMethod) {
      setActivePayment(1);
    } else {
      console.log('current', setHeightPay.current.scrollHeight)
    }
    if(paymentMethod > 1) {
      setHeight(67);
    } else {
      setHeight(13); // 31
    }
    // setHeight((setHeightPay.current?.scrollHeight / 3.4));
  }, [choiceMethod, paymentMethod]);

  useEffect(() => {
    if (activePayment == 1) {
      setHeight(13); // 31
    } else {
      setHeight(67); // 83.4
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
      <div className={`${s.orderFooter__payment} ${paymentStatus ? s.waiterWait : ''}`}>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === 1 ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick(1)}
        >
          Готівка
        </span>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === 2 ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick(2)}
        >
          Термінал
        </span>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === 3 ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick(3)}
        >
          Онлайн
        </span>
      </div>
      <div
        className={s.orderFooter__tips}
        ref={setHeightTips}
        style={{
          minHeight:
            activePayment != 1
              // ? `${setHeightTips.current?.scrollHeight / 3.8}vw`
              ? `${51}vw` // 52
              : "0",
        }}
      >
        <Tips tips={tips} tipsDispatch={tipsDispatch} amount={amount}/>
      </div>
      {isDelivery && form && <DeliveryForm />}
      {/* <input
        className={s.orderFooter__emailInput}
        type="email"
        value={email}
        onChange={emailClient}
        placeholder="Введіть свій E-mail... Фіскальний чек"
      /> */}
    </div>
  );
};

export default PaymentMethod;
