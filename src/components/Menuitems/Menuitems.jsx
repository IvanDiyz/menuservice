'use client'
import { useState } from "react";
import Menuitem from "./Menuitem/Menuitem";
import s from "./Menuitems.module.scss";

export default function Menuitems() {
  const [display, setDispaly] = useState(1);

  let changeDispaly = () => {
    if (display !== 0) {
      setDispaly(0)
    }else {
      setDispaly(1)
    }
  }

    return (
    <section className={s.menuitems}>
      <div className={s.menuitems__change}>
        <p>Відображення</p>
        <div className={`${s.menuitems__boxChange} ${display===0 ? `${s.menuitems__min}` : ''}`} onClick={changeDispaly}>
          <span className={s.menuitems__changebtn}></span>
        </div>
      </div>
      <h4 className={s.menuitems__title}>Піца</h4>
      <Menuitem triger={display} />
      <Menuitem triger={display} />
      <Menuitem triger={display} />
    </section>
  );
}
