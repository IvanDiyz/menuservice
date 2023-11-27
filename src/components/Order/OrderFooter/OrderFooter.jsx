"use client";
import { useAppSelector } from "@/hooks/redux";
import s from "./OrderFooter.module.scss";
import ChoiceMethods from "@/components/Order/ChoiceMethods/ChoiceMethods";
import Total from "@/components/Total/Total";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
import { setPaymentMethod } from "@/store/setOrder/setOrder";

export default function OrderFooter() {
  const selector = useAppSelector;
  const { allAmount } = selector(
    (state) => state.setOrder
  );

  
  return (
    <div className={s.orderFooter}>
      <Total total={allAmount} />
      <ChoiceMethods
        firstmethod={"Cплатити потім"}
        lastmethod={"Сплтатити зараз"}
        svg={false}
      />
      <PaymentMethod dispatchMethod={setPaymentMethod}/>

      <div className={s.orderFooter__btn}>
        <button>Замовити</button>
      </div>
    </div>
  );
}
