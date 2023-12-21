"use client";
import Link from "next/link";
import s from "./Basketheader.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import Popup from "@/components/Popup/Popup";
import { useAppDispatch } from "@/hooks/redux";
import { changeChoice } from "@/store/setOrder/setOrder";
import { useRouter } from "next/navigation";

export default function Basketheader() {
  const router = useRouter();
  const { venueId, tableId } = useSelector((state) => state.menu);
  const { paymentStatus } = useSelector((state) => state.setBasket);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className={s.header}>
      <div className={s.header__wrapper}>
        {paymentStatus ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="arrow-left">
              <path
                id="Vector"
                d="M20 11V13H8L13.5 18.5L12.08 19.92L4.16 12L12.08 4.08002L13.5 5.50002L8 11H20Z"
                fill="black"
              />
            </g>
          </svg>
        ) : (
          <span onClick={handleGoBack}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="arrow-left">
                <path
                  id="Vector"
                  d="M20 11V13H8L13.5 18.5L12.08 19.92L4.16 12L12.08 4.08002L13.5 5.50002L8 11H20Z"
                  fill="black"
                />
              </g>
            </svg>
          </span>
        )}
      </div>
      <div className={s.header__wrapper}>
        <div className={s.header__wrapperBox}>
          <span className={s.header__wrapperSubtitle}>Моє замовлення</span>
          <h4 className={s.header__wrappertitle}>Стіл №{tableId}</h4>
        </div>
      </div>
      <div className={s.header__wrapper}></div>
    </header>
  );
}
