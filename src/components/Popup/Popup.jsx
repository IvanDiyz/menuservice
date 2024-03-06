"use client"

import { useEffect, useRef, useState } from "react";
import s from "./Popup.module.scss";

export default function Popup({popup, closePopup, children, order}) {
  const popapBlock = useRef(null);
  const [height, setHeight] = useState(false)
  useEffect(() => {
    const checkHeight = () => {
      const blockHeight = popapBlock.current.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      console.log('blockHeight', blockHeight)
      console.log('windowHeight', windowHeight)
      if ((blockHeight+150) > windowHeight) {
        setHeight(true)
      }
    };

    if(popup) {
      checkHeight();
    }

    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, [popup]);

  return (
      <div  className={`${s.modal__popup} ${height && `${s.modal__popupActive__height}`} ${popup ? `${s.modal__popupActive}` : ''} ${order ? `${s.modal__orderPage}` : ''}` } onClick={closePopup}>
        <div ref={popapBlock} className={s.modal__popupContent} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
}
