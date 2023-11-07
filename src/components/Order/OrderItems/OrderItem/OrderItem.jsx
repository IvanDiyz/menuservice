import {
  addDish,
  changeQuantity,
  deleteDish,
} from "@/store/setBasket/setBasket";
import Buttons from "@/components/Buttons/Buttons";
import s from "./OrderItem.module.scss";

export default function OrderItems({dish}) {
  return (
    <div className={s.orderItem}>
      <div className={s.orderItem__photo}></div>
      <div className={s.orderItem__info}>
        <h4 className={s.orderItem__infoTitle}>{dish.dish.name}</h4>
        <div className={s.orderItem__infoBoxBtn}>
          <Buttons dish={dish} addDish={addDish} changeQuantity={changeQuantity} deleteDish={deleteDish}/>
        </div>
        <div className={s.orderItem__infoAdditives}>
          <p className={s.orderItem__infoAdditive}>Сир чедер (25₴)</p>
          <p className={s.orderItem__infoAdditive}>Помідор чері (25₴)</p>
          <p className={s.orderItem__infoAdditive}>Курка (35₴)</p>
        </div>
      </div>
      <div className={s.orderItem__price}>
        <span className={s.orderItem__priceItems}>{dish.amount} ₴</span>
        <span className={s.orderItem__priceItem}>{`(${dish.dish.cost}₴)`}</span>
      </div>
    </div>
  );
}
