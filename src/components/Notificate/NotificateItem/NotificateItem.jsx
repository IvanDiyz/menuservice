"use client";
import Link from "next/link";
import s from "./NotificateItem.module.scss";
import { useAppSelector } from "@/hooks/redux";

export default function NotificateItem({role, translateR, callNotificate}) {

  return (
    <div className={s.notificateItem} onClick={()=> callNotificate(role)}>
      <span className={s.notificateItem__title}>Покликати {translateR}</span>
    </div>
  );
}
