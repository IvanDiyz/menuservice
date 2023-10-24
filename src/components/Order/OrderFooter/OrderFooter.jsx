import s from "./OrderFooter.module.scss";

export default function OrderFooter() {
  return (
    <div className={s.orderFooter}>
      <h4 className={s.orderFooter__title}>Спосіб оплати:</h4>
      <div className={s.orderFooter__payment}>
        <span className={`${s.orderFooter__paymentMethod} ${s.orderFooter__paymentActive}`}>Готівка</span>
        <span className={s.orderFooter__paymentMethod}>Термінал</span>
        <span className={s.orderFooter__paymentMethod}>Онлайн</span>
      </div>
      <div className={s.orderFooter__btn}>
        <button>Замовити</button>
      </div>
    </div>
  );
}
