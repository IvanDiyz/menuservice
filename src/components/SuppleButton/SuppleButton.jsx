"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./SuppleButton.module.scss";
import { addAddons, addonsQuantity, deleteAddons } from "@/store/setBasket/setBasket";

export default function SuppleButton({ addonsId, addonsCost, addonsName }) {
  const dispatch = useAppDispatch();
  const select = useAppSelector;
  const { addons } = select((state) => state.setBasket);
  let [quantityAddons, setAddons] = useState(0);

  let calculateObj = {
    plus: () => {
      if (quantityAddons > 0) {
        dispatch(
          addonsQuantity({
            id: addonsId,
            quantity: quantityAddons + 1,
            sign: "plus",
          })
        );
      } else {
        dispatch(
          addAddons({
            id: addonsId,
            quantity: quantityAddons + 1,
            startAmount: addonsCost,
            isReady: false,
            name: addonsName,
          })
        );
      }
    },
    minus: () => {
      dispatch(
        addonsQuantity({
          id: addonsId,
          quantity: quantityAddons - 1,
          sign: "minus",
        })
      );
    },
    delete: () => {
      dispatch(
        deleteAddons({
          id: addonsId,
        })
      );
    },
  };

  useEffect(() => {
    let indexDish = addons.findIndex((item) => item.id === addonsId);
    if (indexDish != -1) {
      let quantityA = addons[indexDish].quantity;
      setAddons(quantityA);
    } else {
      setAddons(0);
    }
  }, [addons]);

  //increase quantityAddons by one
  let plusDish = () => {
    calculateObj["plus"]();
  };
  //reduce quantityAddons by one
  let minusDish = () => {
    if (quantityAddons == 1) {
      calculateObj["delete"]();
    }else {
      calculateObj["minus"]();
    }
  };

  return (
    <div className={s.buttons__info_btn}>
      {quantityAddons > 0 ? (
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
                  fill="#000"
                />
              </g>
            </svg>
          </button>
          <span>{quantityAddons}</span>
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
                  fill="#000"
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
                fill="#000"
              />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
}
