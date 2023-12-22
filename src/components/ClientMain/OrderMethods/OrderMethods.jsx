// Styles
"use client";

import { useState } from "react";
import s from "./OrderMethods.module.scss";
import { setMethodOrder } from "@/store/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const OrderMethods = ({
  keySlice,
  firstmethod,
  lastmethod,
  svg,
  dispatchMethod,
  firstDescription,
  lastDescription,
}) => {
  const selector = useAppSelector;
  const { paymentStatus } = selector((state) => state.setBasket);
  const [isActive, setIsActive] = useState(keySlice);
  const dispatch = useAppDispatch();

  const toggleOrder = (order) => {
    if (paymentStatus) {
      return;
    }
    setIsActive(order);
    dispatch(dispatchMethod(order));
  };

  return (
    <div className={`${s.orderMethods} ${paymentStatus ? s.waiterWait : ""}`}>
      <div
        className={`${s.orderMethods__button} ${
          isActive == firstDescription ? s.active : ""
        }`}
        onClick={() => toggleOrder(firstDescription)}
      >
        {svg ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="silverware-fork-knife">
              <path
                id="Vector"
                d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z"
              />
            </g>
          </svg>
        ) : (
          ""
        )}
        <button className={`${s.orderMethods__btn}`}>{firstmethod}</button>
      </div>
      <div
        className={`${s.orderMethods__button} ${
          isActive == lastDescription ? s.active : ""
        }`}
        onClick={() => toggleOrder(lastDescription)}
      >
        {svg ? (
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="shopping-outline">
              <path
                id="Vector"
                d="M19.5 6H17.5C17.5 3.2 15.3 1 12.5 1C9.7 1 7.5 3.2 7.5 6H5.5C4.4 6 3.5 6.9 3.5 8V20C3.5 21.1 4.4 22 5.5 22H19.5C20.6 22 21.5 21.1 21.5 20V8C21.5 6.9 20.6 6 19.5 6ZM12.5 3C14.2 3 15.5 4.3 15.5 6H9.5C9.5 4.3 10.8 3 12.5 3ZM19.5 20H5.5V8H19.5V20ZM12.5 12C10.8 12 9.5 10.7 9.5 9H7.5C7.5 11.8 9.7 14 12.5 14C15.3 14 17.5 11.8 17.5 9H15.5C15.5 10.7 14.2 12 12.5 12Z"
                fill="#3E3E3E"
              />
            </g>
          </svg>
        ) : (
          ""
        )}
        <button className={s.orderMethods__btn}>{lastmethod}</button>
      </div>
    </div>
  );
};

export default OrderMethods;
