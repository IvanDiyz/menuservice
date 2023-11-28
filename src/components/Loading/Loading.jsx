import s from "./Loading.module.scss";

export default function Loading({ loading }) {
  return (
    <div className={s.body}>
      <div className={s.loading}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <span className={s.text}>Зачекайте хвилинку, створюємо замовлення</span>
    </div>
  );
}
