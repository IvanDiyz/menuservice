"use client"
import Link from "next/link";
import s from "./Totaldish.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addBasket } from "@/store/setBasket/setBasket";

export default function Totaldish({ closePopup }) {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { item } = selector(state => state.setBasket);

  let clickBtn = () => {
    dispatch(addBasket());
    closePopup();
  }

  return (
    <div className={`${s.total} ${item.amount ? `${s.total__active}` : ''}`}>
      <div className={s.total__chek}>
        <span className={s.total__title}>Разом</span>
        <span className={s.total__score}>{item.amount} ₴</span>
      </div>
      <div className={s.total__boxBtn}>
        
          <span className={s.total__btn} onClick={clickBtn}>
            Додати до замовлення
          </span>
        
      </div>
    </div>
  );
}
