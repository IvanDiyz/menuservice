// Styles
import Link from "next/link";
import s from "./ServiceSheet.module.scss";

const ServiceSheet = () => {
  return (
    <div className={s.serviceSheet}>
      <Link href="/menu">
        <div className={s.serviceSheet__box}>
          <div className={s.serviceSheet__nameService}>
            <p className={s.serviceSheet__name}>Основне меню</p>
            <span className={s.serviceSheet__timeService}>9:00 - 22:00</span>
          </div>
          <div className={s.serviceSheet__row}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="chevron-right">
                <path
                  id="Vector"
                  d="M8.59009 16.58L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.58Z"
                  fill="#27257A"
                />
              </g>
            </svg>
          </div>
        </div>
      </Link>
      <div className={s.serviceSheet__box}>
        <div className={s.serviceSheet__nameService}>
          <p className={s.serviceSheet__name}>Кальян меню</p>
          <span className={s.serviceSheet__timeService}></span>
        </div>
        <div className={s.serviceSheet__row}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="chevron-right">
              <path
                id="Vector"
                d="M8.59009 16.58L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.58Z"
                fill="#27257A"
              />
            </g>
          </svg>
        </div>
      </div>
      <Link href="/menu">
        <div className={s.serviceSheet__box}>
          <div className={s.serviceSheet__nameService}>
            <p className={s.serviceSheet__name}>Бар</p>
            <span className={s.serviceSheet__timeService}>11:00 - 22:00</span>
          </div>
          <div className={s.serviceSheet__row}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="chevron-right">
                <path
                  id="Vector"
                  d="M8.59009 16.58L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.58Z"
                  fill="#27257A"
                />
              </g>
            </svg>
          </div>
        </div>
      </Link>
      <Link href="/menu">
        <div className={s.serviceSheet__box}>
          <div className={s.serviceSheet__nameService}>
            <p className={s.serviceSheet__name}>Напої</p>
            <span className={s.serviceSheet__timeService}></span>
          </div>
          <div className={s.serviceSheet__row}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="chevron-right">
                <path
                  id="Vector"
                  d="M8.59009 16.58L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.58Z"
                  fill="#27257A"
                />
              </g>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceSheet;
