import {
  addDish,
  changeQuantity,
  deleteDish,
} from "@/store/setBasket/setBasket";
import Buttons from "@/components/Buttons/Buttons";
import s from "./OrderItem.module.scss";

export default function OrderItem({dish, indexItem}) {
  return (
    <div className={s.orderItem}>
      <div className={s.orderItem__photo}></div>
      <div className={s.orderItem__info}>
        <h4 className={s.orderItem__infoTitle}>{dish.dish.name}</h4>
        <div className={s.orderItem__infoBoxBtn}>
          <Buttons costDiscount={dish.cost - (dish.cost * dish.discount) / 100} dish={dish} orderQuantity={dish.quantity} indexItem={indexItem} addDish={addDish} changeQuantity={changeQuantity} deleteDish={deleteDish}/>
        </div>
        <div className={s.orderItem__infoAdditives}>
          {dish.addons.map(el => (
            <p key={el.id} className={s.orderItem__infoAdditive}>{el.name} ({el.startAmount}₴) - {el.quantity}шт.</p>
          ))}
        </div>
      </div>
      <div className={s.orderItem__price}>
        <span className={s.orderItem__priceItems}>{dish.amount} ₴</span>
        <span className={s.orderItem__priceItem}>{`(${dish.priceDicount}₴)`}</span>
      </div>
    </div>
  );
}
