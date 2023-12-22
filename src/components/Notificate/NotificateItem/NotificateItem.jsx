"use client";
import s from "./NotificateItem.module.scss";

export default function NotificateItem({role, translateR, callNotificate}) {

  return (
    <div className={s.notificateItem} onClick={()=> callNotificate(role)}>
      <span className={s.notificateItem__title}>{translateR}</span>
    </div>
  );
}
