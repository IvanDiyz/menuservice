'use client'
import Link from "next/link";
import s from "./Orderheader.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import Popup from "@/components/Popup/Popup";
import { useAppDispatch } from "@/hooks/redux";
import { changeChoice, clearItems } from "@/store/setOrder/setOrder";

export default function Header() {
  const dispath = useAppDispatch();
  const { venueId, tableId } = useSelector(state => state.menu);
  const [clearBox, callClearBox] = useState(false)

  const clearOrder = () => {
    if(clearBox) {
      callClearBox(false)
    } else {
      callClearBox(true)
    }
  }

  const closePopup = (clear) => {
    if(clear) {
      dispath(clearItems())
      dispath(changeChoice('then'))
    } 
    callClearBox(false)
  }

  return (
    <header className={s.header}>
      {clearBox ? (<Popup popup={clearBox} order='order'>
        <div className={s.header__popupBox}>
          <h6 className={s.header__popupTitle}>Ви впевнені, що хочете очистити кошик?</h6>
          <div className={s.header__popupBtns}>
            <span className={`${s.header__popupBtn} ${s.header__popupBtnY}`} onClick={() => closePopup(true)}>Так</span>
            <span className={`${s.header__popupBtn} ${s.header__popupBtnN}`} onClick={() => closePopup(false)}>Ні</span>
          </div>
        </div>
      </Popup>) : ''}
      
      <div className={s.header__wrapper}>
        <Link href={`/${venueId}/${tableId}/menu`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="arrow-left">
              <path
                id="Vector"
                d="M20 11V13H8L13.5 18.5L12.08 19.92L4.16 12L12.08 4.08002L13.5 5.50002L8 11H20Z"
                fill="black"
              />
            </g>
          </svg>
        </Link>
      </div>
      <div className={s.header__wrapper}>
        <div className={s.header__wrapperBox}>
          <span className={s.header__wrapperSubtitle}>Моє замовлення</span>
          <h4 className={s.header__wrappertitle}>Стіл №{tableId}</h4>
        </div>
      </div>
      <div className={s.header__wrapper} onClick={clearOrder}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="trash-can-outline">
            <path
              id="Vector"
              d="M9 3V4H4V6H5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"
              fill="#EB3800"
            />
          </g>
        </svg>
      </div>
    </header>
  );
}
