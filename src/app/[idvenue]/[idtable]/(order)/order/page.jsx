"use client"
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import OrderItems from "@/components/Order/OrderItems/OrderItems";
import Tips from "@/components/Tips/Tips";
import s from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { managerItems, setDelivery } from "@/store/setOrder/setOrder";
import { useEffect } from "react";

export default function Order() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { delivery, items, amount } = selector(store => store.setOrder)

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem('items'))
    const localAmount = JSON.parse(localStorage.getItem('amount'))
    if(localItems !== null && localAmount !== null) {
      dispatch(managerItems({items: localItems, amount: localAmount}))
    }
  }, [])

  useEffect(() => {
    const itemsJSON = JSON.stringify(items);
    localStorage.setItem("items", itemsJSON);
    localStorage.setItem("amount", amount);
  }, [items])

  return (
    <div className={s.order}>
     <OrderMethods keySlice={delivery} dispatchMethod={setDelivery} firstDescription={false} lastDescription={true} firstmethod={'По готовності'} lastmethod={'Все разом'} svg={false}/>
     <OrderItems />
    </div>
  );
}
