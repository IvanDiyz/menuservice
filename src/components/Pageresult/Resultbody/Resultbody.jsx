import Link from "next/link";

import s from "./Resultbody.module.scss";

export default function Resultbody({ answer }) {
  return (
    <>
      {answer ? (
        <div className={s.pageresult}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="check-decagram">
              <path
                id="Vector"
                d="M53.6667 28L47.9734 21.5133L48.7667 12.9267L40.3434 11.0133L35.9334 3.59332L28 6.99999L20.0667 3.59332L15.6567 11.0133L7.23337 12.9033L8.02671 21.49L2.33337 28L8.02671 34.4867L7.23337 43.0967L15.6567 45.01L20.0667 52.43L28 49L35.9334 52.4067L40.3434 44.9867L48.7667 43.0733L47.9734 34.4867L53.6667 28ZM23.3334 39.6667L14 30.3333L17.29 27.0433L23.3334 33.0633L38.71 17.6867L42 21L23.3334 39.6667Z"
                fill="#19A047"
              />
            </g>
          </svg>
          <h6 className={s.pageresult__title}>Дякуємо</h6>
          <p className={s.pageresult__text}>Ваш платіж успішно пройдена</p>
        </div>
      ) : (
        <div className={s.pageresult}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="wifi-remove">
              <path
                id="Vector"
                d="M28.0001 28C23.2634 28 18.9 29.5633 15.4 32.2L11.2 26.6C15.89 23.0767 21.7001 21 28.0001 21C34.3001 21 40.1101 23.0767 44.8001 26.6L41.8134 30.5667C40.9501 30.73 40.0867 30.9633 39.2934 31.29C36.0267 29.1667 32.1534 28 28.0001 28ZM49 21L53.2001 15.4C46.1767 10.1267 37.4501 7 28.0001 7C18.55 7 9.82338 10.1267 2.80005 15.4L7.00005 21C12.8334 16.6133 20.1134 14 28.0001 14C35.8867 14 43.1667 16.6133 49 21ZM28.0001 35C24.85 35 21.9334 36.05 19.6 37.8L28.0001 49L30.4267 45.7567C30.3334 45.29 30.3334 44.8233 30.3334 44.3333C30.3334 41.2067 31.3601 38.3367 33.1101 36.0033C31.5 35.3733 29.7967 35 28.0001 35ZM49.2801 36.0733L44.3334 41.0433L39.3867 36.0967L36.0967 39.3867L41.0434 44.3333L36.0967 49.28L39.3867 52.5933L44.3334 47.6233L49.2801 52.5933L52.5934 49.28L47.6234 44.3333L52.5934 39.3867L49.2801 36.0733Z"
                fill="#EB3800"
              />
            </g>
          </svg>
          <h6 className={s.pageresult__title}>Немає підключення</h6>
          <p className={s.pageresult__text}>Інтернет зʼєднання відсутнє. Спробуйте перезавантажити інтернет</p>
          <Link className={s.pageresult__btn} href="/">Оновити</Link>
        </div>
      )}
    </>
  );
}
