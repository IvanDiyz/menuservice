import s from "./Loading.module.scss";

export default function Loading({ text }) {
  return (
    <div className={s.body}>
      <div className={s.loading}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <span className={s.text}>{text ? text : 'Зачекайте хвилинку, створюємо замовлення'}</span>
    </div>
  );
}
