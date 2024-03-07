"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./PaymentMethod.module.scss";
import Tips from "../Tips/Tips";
import DeliveryForm from "../DeliveryForm/DeliveryForm";
import { changeChoice } from "@/store/setOrder/setOrder";

const PaymentMethod = ({tips, choiceMethod, dispatchMethod, amount, tipsDispatch, form, payment, method, basket}) => {
  const setHeightTips = useRef();
  const methodHeight = useRef();

  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const { isDelivery } = selector((state) => state.menu);
  const { paymentStatus } = selector((state) => state.setBasket);

  const [email, setEmail] = useState("");
  const [activePayment, setActivePayment] = useState(method);
  const [heightPay, setHeight] = useState();
  const [tipsHeight, setTipsHeight] = useState(0);

  let emailClient = (e) => {
    if(paymentStatus) return
    setEmail(e.target.value);
  };

  useEffect(() => {
    method != 1 ? setTipsHeight(setHeightTips.current.scrollHeight) : setTipsHeight(0);
    choiceMethod ? setHeight(methodHeight.current.scrollHeight + 20) : setHeight(0);

    isDelivery && dispatch(changeChoice(true))
    !choiceMethod && !basket && dispatch(dispatchMethod(1))
    payment && setActivePayment(method)
    if (!choiceMethod) {
      setActivePayment( method || 1);
    }
    
  }, [choiceMethod, method, activePayment]);
  

  const handlePaymentClick = (method) => {
    if(paymentStatus) {
      return
    }
    setActivePayment(method);
    dispatch(dispatchMethod(method))
  };

  return (
    <div
      className={`${s.orderFooter__paymentBox} ${
        choiceMethod  ? `${s.orderFooter__paymentBox__active}` : ""
      }`}
    >
      <div style={{height: `${heightPay}px`}}  className={`${s.orderFooter__payment} ${paymentStatus ? s.waiterWait : ''}`}>
        <span
          className={`${s.orderFooter__paymentMethod} ${
            activePayment === 1 ? s.orderFooter__paymentActive : ""
          }`}
          onClick={() => handlePaymentClick(1)}
          ref={methodHeight}
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
        style={{height: `${tipsHeight}px`}}
      > 
        <Tips payment={payment} tips={tips} tipsDispatch={tipsDispatch} amount={amount}/>
      </div>
      {isDelivery && form && <div /* ref={formWrapper} */><DeliveryForm /></div>}
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
