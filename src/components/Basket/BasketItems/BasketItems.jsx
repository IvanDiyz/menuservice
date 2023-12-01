"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./BasketItems.module.scss";
import BasketItem from "@/components/Basket/BasketItems/BasketItem/BasketItem";
import { useEffect } from "react";
import { setItems, clearItems } from "@/store/setBasket/setBasket";


export default function BasketItems() {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  // const { items, amount } = selector(state => state.setOrder);
  const {check, items, responsDish } = selector(state => state.setBasket);

  useEffect(() => {
    if(check == 'payAll') {
      dispatch(setItems(responsDish))
    } else {
      dispatch(clearItems())
    }
  }, [check])

  

  if(responsDish.length == 0) {
    return <span className={s.orderEmpty}>Ви ще нічого не замовили</span>
  } else {
    return (
      <div className={s.orderItems}>
        {responsDish.map((el, index) => (
          <BasketItem check={check} key={`${el.id}${index}`} dish={el} indexItem={index + 1}/>
        ))}
      </div>
    );
  }
}
