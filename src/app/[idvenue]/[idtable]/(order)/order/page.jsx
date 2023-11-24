"use client"
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import OrderItems from "@/components/Order/OrderItems/OrderItems";
import Tips from "@/components/Tips/Tips";
import s from "./page.module.scss";
import { useAppSelector } from "@/hooks/redux";

export default function Order() {
  const selector = useAppSelector;
  return (
    <div className={s.order}>
     <OrderMethods firstmethod={'По готовності'} lastmethod={'Все разом'} svg={false}/>
     <OrderItems />
    </div>
  );
}
