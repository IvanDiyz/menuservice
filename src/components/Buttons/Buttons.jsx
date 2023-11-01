"use client";
import { useEffect, useState } from "react";
import {
  addDish,
  changeQuantity,
  deleteDish,
} from "@/store/setBasket/setBasket";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./Buttons.module.scss";

export default function Buttons({ dish }) {
  const dispatch = useAppDispatch();
  const select = useAppSelector;
  const { items } = select((state) => state.setBasket);
  const [calculate, setCalculate] = useState("");
  let [quantityDish, setQuantity] = useState(0);

  let calculateObj = {
    plus: () => {
      if (quantityDish > 0) {
        dispatch(
          changeQuantity({
            id: dish.id,
            quantity: quantityDish + 1,
            sign: calculate,
          })
        );
      } else {
        dispatch(
          addDish({
            id: dish.id,
            quantity: quantityDish + 1,
            amount: dish.cost,
            isReady: false,
            dish: dish,
          })
        );
      }
    },
    minus: () => {
      dispatch(
        changeQuantity({
          id: dish.id,
          quantity: quantityDish - 1,
          sign: calculate,
        })
      );
    },
    delete: () => {
      dispatch(
        deleteDish({
          id: dish.id,
        })
      );
    },
  };

  useEffect(() => {
    let indexDish = items.findIndex((item) => item.id === dish.id);
    if (indexDish != -1) {
      let quantityA = items[indexDish].quantity;
      setQuantity(quantityA);
    } else {
      setQuantity(0);
    }
  }, [items]);

  //increase quantityDish by one
  let plusDish = () => {
    setCalculate("plus");
    calculateObj["plus"]();
  };
  //reduce quantityDish by one
  let minusDish = () => {
    setCalculate("minus");
    if (quantityDish == 1) {
      calculateObj["delete"]();
    }else {
      calculateObj["minus"]();
    }
  };

  return (
    <div className={s.buttons__info_btn}>
      {quantityDish > 0 ? (
        <div className={s.buttons__info_btn_active}>
          <button onClick={() => minusDish()}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="minus">
                <path
                  id="Vector"
                  d="M19 13.4259H5V11.4259H19V13.4259Z"
                  fill="black"
                />
              </g>
            </svg>
          </button>
          <span>{quantityDish}</span>
          <button onClick={() => plusDish()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="plus">
                <path
                  id="Vector"
                  d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  fill="black"
                />
              </g>
            </svg>
          </button>
        </div>
      ) : (
        <button onClick={() => plusDish()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="plus">
              <path
                id="Vector"
                d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                fill="white"
              />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
}
