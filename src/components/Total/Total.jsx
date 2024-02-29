import s from "./Total.module.scss";

export default function Total({total, totalDeclined}) {

  return (
    <div className={s.total}>
      {totalDeclined > 0 && (
      <div className={s.total__wrapper}>
        <span className={s.total__title}>Знижка:</span>
        <span className={s.total__declined}>{totalDeclined} ₴</span>
      </div>
      )}
      <div className={s.total__wrapper}>
        <span className={s.total__title}>Всього до сплати:</span>
        <span className={s.total__price}>{total} ₴</span>
      </div>
    </div>
  );
}
