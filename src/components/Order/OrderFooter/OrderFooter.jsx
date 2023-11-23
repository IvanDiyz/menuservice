"use client";
import { useAppSelector } from "@/hooks/redux";
import s from "./OrderFooter.module.scss";
import ChoiceMethods from "@/components/Order/ChoiceMethods/ChoiceMethods";
import Total from "@/components/Total/Total";
import { useEffect, useRef, useState } from "react";
import Tips from "@/components/Tips/Tips";

export default function OrderFooter() {
  const setHeightPay = useRef(null);
  const setHeightTips = useRef(null);
  const selector = useAppSelector;
  const { amount, allAmount, choiceMethod } = selector(
    (state) => state.setBasket
  );
  const [email, setEmail] = useState("");
  const [activePayment, setActivePayment] = useState("cash");
  const [heightPay, setHeight] = useState();

  let emailClient = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    setHeight(setHeightPay.current?.scrollHeight)
  }, [choiceMethod])

  useEffect(() => {
    setHeight(setHeightPay.current?.scrollHeight)
  }, [choiceMethod])
  useEffect(() => {
    if(activePayment == "cash") {
      setHeight(148)
    } else {
      setHeight(388)
    }
  }, [activePayment])
  
  
  const handlePaymentClick = (paymentMethod) => {
    setActivePayment(paymentMethod);
  };

  return (
    <div className={s.orderFooter}>
      <Total total={allAmount} />
      <ChoiceMethods
        firstmethod={"Cплатити потім"}
        lastmethod={"Сплтатити зараз"}
        svg={false}
      />
      <div
        ref={setHeightPay}
        style={{
          height:
            choiceMethod === "now"
              ? `${heightPay}px`
              : "0",
        }}
        className={`${s.orderFooter__paymentBox} ${
          choiceMethod == "now" ? `${s.orderFooter__paymentBox__active}` : ""
        }`}
      >
        <h4 className={s.orderFooter__title}>Спосіб оплати:</h4>
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

      <div className={s.orderFooter__btn}>
        <button>Замовити</button>
      </div>
    </div>
  );
}
