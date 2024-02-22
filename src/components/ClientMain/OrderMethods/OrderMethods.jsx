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
  hide,
  deliveryProp,
  deliveryDescription,
  deliveryMethod,
  style
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
        style={isActive === firstDescription ? style?.active : style.disable}
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
        <button className={`${s.orderMethods__btn}`}>
          {hide
            ? `${isActive == firstDescription ? firstmethod : ""}`
            : firstmethod}
        </button>
      </div>
      {deliveryProp && (
        <div
          style={isActive == 'Із собою' ? style?.active : style.disable}
          className={`${s.orderMethods__button} ${
            isActive == lastmethod ? s.active : ""
          }`}
          onClick={() => toggleOrder(lastmethod)} // ставим lastmethod поскольку, у нас сейчас с собой, на вынос и доставка принимает bool что не может быть.
        >
          {svg ? (
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="bike-fast" clipPath="url(#clip0_369_530)">
                <path
                  id="Vector"
                  d="M16.5 1.2C15.5 1.2 14.7 2 14.7 3C14.7 4 15.5 4.8 16.5 4.8C17.5 4.8 18.3 4 18.3 3C18.3 2 17.5 1.2 16.5 1.2ZM12.9 4.1C12.43 4.1 12 4.29 11.7 4.6L8 8.29C7.69 8.6 7.5 9 7.5 9.5C7.5 10.13 7.83 10.66 8.35 10.97L11.7 13V18H13.5V11.5L11.25 9.85L13.57 7.5L15.3 10H19.5V8.2H16.3L14.36 4.93C14.07 4.43 13.5 4.1 12.9 4.1ZM5.5 12C2.74 12 0.5 14.24 0.5 17C0.5 19.76 2.74 22 5.5 22C8.26 22 10.5 19.76 10.5 17C10.5 14.24 8.26 12 5.5 12ZM5.5 20.5C3.57 20.5 2 18.93 2 17C2 15.07 3.57 13.5 5.5 13.5C7.43 13.5 9 15.07 9 17C9 18.93 7.43 20.5 5.5 20.5ZM19.5 12C16.74 12 14.5 14.24 14.5 17C14.5 19.76 16.74 22 19.5 22C22.26 22 24.5 19.76 24.5 17C24.5 14.24 22.26 12 19.5 12ZM19.5 20.5C17.57 20.5 16 18.93 16 17C16 15.07 17.57 13.5 19.5 13.5C21.43 13.5 23 15.07 23 17C23 18.93 21.43 20.5 19.5 20.5ZM7.35355 7.64644C7.15829 7.8417 6.84171 7.8417 6.64645 7.64644L5.79289 6.79288C5.60536 6.60535 5.5 6.35099 5.5 6.08577V4.89926C5.5 4.64292 5.59844 4.39636 5.775 4.21051L8.00682 1.86123C8.19655 1.66152 8.51206 1.65288 8.71243 1.84191L10.6256 3.64674C10.8306 3.84015 10.8353 4.16469 10.636 4.36399L9.5 5.49999L7.35355 7.64644Z"
                  fill="#3E3E3E"
                />
              </g>
              <defs>
                <clipPath id="clip0_369_530">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : (
            ""
          )}
          <button className={`${s.orderMethods__btn}`}>
            {hide
              ? `${isActive == lastmethod ? deliveryMethod : ""}`
              : deliveryMethod}
          </button>
        </div>
      )}
      <div
        style={isActive === lastDescription ? style?.active : style.disable}
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
        <button className={s.orderMethods__btn}>
          {hide
            ? `${isActive == lastDescription ? lastmethod : ""}`
            : lastmethod}
        </button>
      </div>
    </div>
  );
};

export default OrderMethods;
