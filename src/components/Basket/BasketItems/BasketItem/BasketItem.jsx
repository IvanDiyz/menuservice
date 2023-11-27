import { addDish, changeQuantity, deleteDish } from "@/store/setOrder/setOrder";
import Buttons from "@/components/Buttons/Buttons";
import s from "./BasketItem.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addItem, clearItems, removeItem, setItems } from "@/store/setBasket/setBasket";

export default function BasketItem({ dish, indexItem, check }) {
  const dispatch = useAppDispatch();
  const [checkbox, setCheckbox] = useState(false);

  const clickCheckbox = () => {
    if(checkbox) {
      setCheckbox(false)
    } else {
      setCheckbox(true)
    }
    changeItems()
  }
  const changeItems = () => {
    if(checkbox) {
      dispatch(removeItem(dish))
    } else {
      dispatch(addItem(dish))
    }
  }


  return (
    <div className={s.orderItem}>
      <div className={s.orderItem__info}>
        <div className={s.orderItem__photo}></div>
        <div className={s.orderItem__infoBox}>
          <h4 className={s.orderItem__infoTitle}>{dish.dish.name}</h4>
          <div className={s.orderItem__infoBoxBtn}>
            <span className={s.orderItem__quantity}>{dish.quantity}</span>
          </div>
          <div className={s.orderItem__infoAdditives}>
            {dish.addons.map((el) => (
              <p key={el.id} className={s.orderItem__infoAdditive}>
                {el.name} ({el.startAmount}₴) - {el.quantity}шт.
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={s.orderItem__price}>
        <span className={s.orderItem__priceItems}>{dish.amount} ₴</span>
        <span
          className={s.orderItem__priceItem}
        >{`(${dish.priceDicount}₴)`}</span>
        {check != 'payAll' ? (

        <div className={s.orderItem__checkBox} onClick={clickCheckbox}>
          <span className={`${s.orderItem__checkBox__cheked} ${checkbox ? `${s.orderItem__checkBox__active}` : ''}`}></span>
        </div>
        ) : ''}
      </div>
    </div>
  );
}
