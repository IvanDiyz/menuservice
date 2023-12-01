import { addDish, changeQuantity, deleteDish } from "@/store/setOrder/setOrder";
import Buttons from "@/components/Buttons/Buttons";
import s from "./BasketItem.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addItem,
  clearItems,
  removeItem,
  setItems,
} from "@/store/setBasket/setBasket";

export default function BasketItem({ dish, indexItem, check }) {
  const dispatch = useAppDispatch();
  const [checkbox, setCheckbox] = useState(false);
  const [comment, checkHeight] = useState(false);
  const commentSpan = useRef();
  let img = dish.dish.img;
  const setHeightComment = (e) => {
    if (comment) {
      checkHeight(false);
      commentSpan.current.style.height = 24 + "px";
    } else {
      checkHeight(true);
      console.log("target", e);
      console.log("ref", commentSpan);
      let height = e.target.scrollHeight;
      commentSpan.current.style.height = height + "px";
    }
  };
  useEffect(() => {
    if (check == "payAll") {
      setCheckbox(false);
    }
  }, [check]);

  const clickCheckbox = () => {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
    changeItems();
  };
  const changeItems = () => {
    if (checkbox) {
      dispatch(removeItem(dish));
    } else {
      dispatch(addItem(dish));
    }
  };

  return (
    <div className={s.basketItem}>
      <div className={s.basketItem__info}>
        <div
          style={img ? { backgroundImage: `url(${dish.dish.img})` } : ""}
          className={s.basketItem__photo}
        ></div>
        <div className={s.basketItem__infoBox}>
          <h4 className={s.basketItem__infoTitle}>{dish.dish?.name}</h4>
          <div className={s.basketItem__infoBoxBtn}>
            <span className={s.basketItem__quantity}>{dish.quantity}</span>
          </div>
          {dish.comment ? (
            <div className={s.basketItem__commentBox}>
              <svg
                width="14"
                height="24"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="comment-text-multiple" clipPath="url(#clip0_88_551)">
                  <path
                    id="Vector"
                    d="M1.75016 9.4261H0.583496V2.4261C0.583496 2.11668 0.706412 1.81994 0.925205 1.60115C1.144 1.38235 1.44074 1.25944 1.75016 1.25944H11.0835V2.4261H1.75016V9.4261ZM7.00016 14.0928C6.84545 14.0928 6.69708 14.0313 6.58768 13.9219C6.47829 13.8125 6.41683 13.6641 6.41683 13.5094V11.7594H4.0835C3.77408 11.7594 3.47733 11.6365 3.25854 11.4177C3.03975 11.1989 2.91683 10.9022 2.91683 10.5928V4.75944C2.91683 4.45002 3.03975 4.15327 3.25854 3.93448C3.47733 3.71569 3.77408 3.59277 4.0835 3.59277H12.2502C12.5596 3.59277 12.8563 3.71569 13.0751 3.93448C13.2939 4.15327 13.4168 4.45002 13.4168 4.75944V10.5928C13.4168 10.9022 13.2939 11.1989 13.0751 11.4177C12.8563 11.6365 12.5596 11.7594 12.2502 11.7594H9.8585L7.70016 13.9236C7.5835 14.0286 7.4435 14.0928 7.29183 14.0928H7.00016ZM5.25016 5.9261V7.09277H11.0835V5.9261H5.25016ZM5.25016 8.25944V9.4261H9.91683V8.25944H5.25016Z"
                    fill="#696969"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_88_551">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0 0.676102)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span
                onClick={setHeightComment}
                ref={commentSpan}
                style={{ height: "24px" }}
                className={s.basketItem__comment}
              >
                {dish.comment}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className={s.basketItem__infoAdditives}>
            {dish.orderDishAddons?.map((el) => (
              <p key={el.id} className={s.basketItem__infoAdditive}>
                {el.addon.title} ({el.addon.cost}₴) - {el.addonQuantity}шт.
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={s.basketItem__price}>
        <span className={s.basketItem__priceItems}>{dish.amount} ₴</span>
        <span className={s.basketItem__priceItem}>{`(${
          Math.ceil(
            ((dish.dish.cost * (100 - dish.dish.discount)) / 100) * 100
          ) / 100
        }₴)`}</span>
        {check != "payAll" ? (
          <div className={s.basketItem__checkBox} onClick={clickCheckbox}>
            <span
              className={`${s.basketItem__checkBox__cheked} ${
                checkbox ? `${s.basketItem__checkBox__active}` : ""
              }`}
            ></span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
