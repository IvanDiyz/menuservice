"use client"
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import BasketItems from "@/components/Basket/BasketItems/BasketItems";
import s from "./page.module.scss";
import { useAppSelector } from "@/hooks/redux";
import { setCheck } from "@/store/setBasket/setBasket";

export default function Basket() {
  const selector = useAppSelector;
  const  { check } = selector(state => state.setBasket)
  return (
    <div className={s.order}>
     <OrderMethods keySlice={check} dispatchMethod={setCheck} firstDescription={'payAll'} lastDescription={'splitPay'} firstmethod={'Сплатити за все'} lastmethod={'Розділити чек'} svg={false}/>
     <h4 className={s.title}>Відвідувач №1</h4>
     <BasketItems />
    </div>
  );
}
