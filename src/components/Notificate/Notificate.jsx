"use client";
import NotificateItem from "@/components/Notificate/NotificateItem/NotificateItem";
import Link from "next/link";
import s from "./Notificate.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setNotificate } from "@/store/menu/menuSlice";

export default function Notificate() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { notificate } = selector((state) => state.menu);

  let closeNotificate = () => {
    dispatch(setNotificate(false));
  }

  return (
    <div className={`${s.notificate} ${notificate > 0 ? `${s.notificate__active}` : ""}`}>
      <span className={s.notificate__close} onClick={closeNotificate}></span>
      <svg
        width="52"
        height="50"
        viewBox="0 0 52 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.0002 40.3333V42.6666H5.00016V40.3333L9.66683 35.6666V21.6666C9.66683 14.4333 14.4035 8.06329 21.3335 6.00996C21.3335 5.77663 21.3335 5.56663 21.3335 5.33329C21.3335 4.09562 21.8252 2.90863 22.7003 2.03346C23.5755 1.15829 24.7625 0.666626 26.0002 0.666626C27.2378 0.666626 28.4248 1.15829 29.3 2.03346C30.1752 2.90863 30.6668 4.09562 30.6668 5.33329C30.6668 5.56663 30.6668 5.77663 30.6668 6.00996C37.5968 8.06329 42.3335 14.4333 42.3335 21.6666V35.6666L47.0002 40.3333ZM30.6668 45C30.6668 46.2376 30.1752 47.4246 29.3 48.2998C28.4248 49.175 27.2378 49.6666 26.0002 49.6666C24.7625 49.6666 23.5755 49.175 22.7003 48.2998C21.8252 47.4246 21.3335 46.2376 21.3335 45M44.0835 3.44329L40.7702 6.75663C44.7602 10.7 47.0002 16.0666 47.0002 21.6666H51.6668C51.6668 14.83 48.9602 8.24996 44.0835 3.44329ZM0.333496 21.6666H5.00016C5.00016 16.0666 7.24016 10.7 11.2302 6.75663L7.91683 3.44329C3.04016 8.24996 0.333496 14.83 0.333496 21.6666Z"
          fill="#FF5C00"
        />
      </svg>
      <h6 className={s.notificate__title}>Виклик</h6>
      <span className={s.notificate__note}>Оберіть, кого ви хочете покликати</span>
      <div className={s.notificate__wrapper}>
        <NotificateItem role={'WAITER'} translateR={'офіціанта'}/>
        <NotificateItem role={'WAITER'} translateR={'адміністратора'}/>
        <NotificateItem role={'WAITER'} translateR={'кальянщика'}/>
      </div>
    </div>
  );
}
