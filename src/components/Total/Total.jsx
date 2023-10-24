import s from "./Total.module.scss";

export default function Total({total}) {

  return (
    <div className={s.total}>
      <span>Всього до сплати:</span>
      <span>{total} ₴</span>
    </div>
  );
}
