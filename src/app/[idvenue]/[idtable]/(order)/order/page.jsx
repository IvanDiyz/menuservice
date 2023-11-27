"use client"
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import OrderItems from "@/components/Order/OrderItems/OrderItems";
import Tips from "@/components/Tips/Tips";
import s from "./page.module.scss";
import { useAppSelector } from "@/hooks/redux";
import { setDelivery } from "@/store/setOrder/setOrder";

export default function Order() {
  const selector = useAppSelector;
  const { delivery } = selector(store => store.setOrder)
  return (
    <div className={s.order}>
     <OrderMethods keySlice={delivery} dispatchMethod={setDelivery} firstDescription={'when ready'} lastDescription={'together'} firstmethod={'По готовності'} lastmethod={'Все разом'} svg={false}/>
     <OrderItems />
    </div>
  );
}
