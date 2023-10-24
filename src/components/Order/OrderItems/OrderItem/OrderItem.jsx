import s from "./OrderItem.module.scss";

export default function OrderItems() {
  return (
    <div className={s.orderItem}>
      <div className={s.orderItem__photo}></div>
      <div className={s.orderItem__info}>
        <h4 className={s.orderItem__infoTitle}>Піца 4 сири, 400г</h4>
        <div className={s.orderItem__infoBoxBtn}>
          <button className={s.orderItem__infoBtn}>
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
          <span className={s.orderItem__infoValue}>1</span>
          <button className={s.orderItem__infoBtn}>
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
                  fill="#000"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className={s.orderItem__infoAdditives}>
          <p className={s.orderItem__infoAdditive}>Сир чедер (25₴)</p>
          <p className={s.orderItem__infoAdditive}>Помідор чері (25₴)</p>
          <p className={s.orderItem__infoAdditive}>Курка (35₴)</p>
        </div>
      </div>
      <div className={s.orderItem__price}>
        <span className={s.orderItem__priceItems}>630 ₴</span>
        <span className={s.orderItem__priceItem}>(275 ₴)</span>
      </div>
    </div>
  );
}
