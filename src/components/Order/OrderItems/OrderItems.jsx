"use client"
import { useAppSelector } from "@/hooks/redux";
import s from "./OrderItems.module.scss";
import OrderItem from "@/components/Order/OrderItems/OrderItem/OrderItem";
import { useEffect } from "react";


export default function OrderItems() {
  const selector = useAppSelector;
  const { items, amount } = selector(state => state.setOrder);

  if(items.length == 0) {
    return <span className={s.orderEmpty}>Ви ще нічого не замовили</span>
  } else {
    return (
      <div className={s.orderItems}>
        {items.map((el, index) => (
          <OrderItem key={`${el.id}${index}`} dish={el} indexItem={index + 1}/>
        ))}
      </div>
    );
  }
}
