"use client"

import s from "./Popup.module.scss";

export default function Popup({popup, closePopup, children, order}) {
  return (
      <div className={`${s.modal__popup} ${popup ? `${s.modal__popupActive}` : ''} ${order ? `${s.modal__orderPage}` : ''}` } onClick={closePopup}>
        <div className={s.modal__popupContent} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
}
