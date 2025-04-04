"use client"
import Link from "next/link";
import s from "./Totalscore.module.scss";
import { useAppSelector } from "@/hooks/redux";

export default function Totalscore() {
  const selector = useAppSelector;
  const { amount, items } = selector(state => state.setOrder)
  const { venueId, tableUId } = selector(state => state.menu)

  return (
    <div className={`${s.total} ${items.length > 0 ? `${s.total__active}` : ''}`}>
      <div className={s.total__chek}>
        <span className={s.total__title}>Загальний чек</span>
        <span className={s.total__score}>{amount} ₴</span>
      </div>
      <div className={s.total__boxBtn}>
        <Link href={`/${venueId}/${tableUId}/order`}>
          <span className={s.total__btn}>
          Переглянути замовлення
          </span>
        </Link>
      </div>
    </div>
  );
}
