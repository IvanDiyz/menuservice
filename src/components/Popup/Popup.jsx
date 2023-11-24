"use client"

import s from "./Popup.module.scss";

export default function Popup({popup, closePopup, children}) {
  return (
      <div className={`${s.modal__popup} ${popup ? `${s.modal__popupActive}` : ''}`} onClick={closePopup}>
        <div className={s.modal__popupContent} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
}
