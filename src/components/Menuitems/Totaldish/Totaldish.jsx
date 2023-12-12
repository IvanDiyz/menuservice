"use client"
import Link from "next/link";
import s from "./Totaldish.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addBasket } from "@/store/setOrder/setOrder";
import { useEffect, useState } from "react";

export default function Totaldish({ text, closePopup, title, dispatchMethod, indexItem }) {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { item, amount, items } = selector(state => state.setOrder);
  const [click, changeClick] = useState(false);

  useEffect(() => {
    if(click) {
      const itemsJSON = JSON.stringify(items);
      localStorage.setItem('amount', amount)
      localStorage.setItem('items', itemsJSON)
      changeClick(false)
    }
  }, [click])

  let clickBtn = () => {
    if(indexItem) {
      dispatch(dispatchMethod({indexItem: indexItem, item: item, text: text}));
    } else {
      dispatch(dispatchMethod(text));
    }
    closePopup();
    changeClick(true)
  }

  return (
    <div className={`${s.total} ${item.amount ? `${s.total__active}` : ''}`}>
      <div className={s.total__chek}>
        <span className={s.total__title}>Разом</span>
        <span className={s.total__score}>{item.amount ? item.amount : 0} ₴</span>
      </div>
      <div className={s.total__boxBtn}>
        
          <span className={s.total__btn} onClick={clickBtn}>
            {title ? title : 'Додати до замовлення'}
          </span>
        
      </div>
    </div>
  );
}
