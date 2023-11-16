"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./Buttons.module.scss";
import { usePathname } from "next/navigation";

export default function Buttons({ dish, addDish, changeQuantity, deleteDish, orderQuantity, indexItem }) {
  const dispatch = useAppDispatch();
  const select = useAppSelector;
  const pathName = usePathname();
  const { item, addons, items} = select((state) => state.setBasket);
  let [quantityDish, setQuantity] = useState(orderQuantity ? orderQuantity : 0);

  let calculateObj = {
    plus: () => {
      if (quantityDish > 0) {
        dispatch(
          changeQuantity({
            id: dish.id,
            quantity: quantityDish + 1,
            sign: "plus",
            addons: addons,
            indexItem: indexItem,
            pathName: pathName,
          })
        );
      } else {
        dispatch(
          addDish({
            id: dish.id,
            quantity: quantityDish + 1,
            amountDish: +dish.cost,
            isReady: false,
            dish: dish,
            addons: addons,
          })
        );
      }
    },
    minus: () => {
      dispatch(
        changeQuantity({
          id: dish.id,
          quantity: quantityDish - 1,
          sign: "minus",
          addons: addons,
          indexItem: indexItem,
          pathName: pathName,
        })
      );
    },
    delete: () => {
      dispatch(
        deleteDish({
          id: dish.id,
          pathName: pathName,
          indexItem: indexItem,
        })
      );
    },
  };

  useEffect(() => {
    
    if(dish.quantity !== quantityDish) {
      setQuantity(orderQuantity)
    }
    if(!orderQuantity && pathName != '/order') {
      if (item.quantity) {
        setQuantity(item.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [item, items]);

  //increase quantityDish by one
  let plusDish = () => {
    calculateObj["plus"]();
  };
  //reduce quantityDish by one
  let minusDish = () => {
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
