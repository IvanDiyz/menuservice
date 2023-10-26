"use client";
import { useEffect, useState } from "react";
import Menuitem from "./Menuitem/Menuitem";
import s from "./Menuitems.module.scss";
import { useAppSelector } from "@/hooks/redux";

export default function Menuitems() {
  const selector = useAppSelector;
  const [display, setDispaly] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { items, total, limit, currentPage } = selector(
    (state) => state.getDishis.dishis
  );
  const { stateDishis } = selector((state) => state.getDishis);

  useEffect(() => {
    // Дождитесь, пока stateDishis станет true, прежде чем установить dataLoaded в true
    if (stateDishis) {
      setDataLoaded(true);
      console.log("items", items);
    }
  }, [stateDishis]);

  let changeDispaly = () => {
    if (display !== 0) {
      setDispaly(0);
    } else {
      setDispaly(1);
    }
  };
  if (!dataLoaded) {
    return <>Loading...</>;
  } else {
    return (
      <section className={s.menuitems}>
        <div className={s.menuitems__change}>
          <p>Відображення</p>
          <div
            className={`${s.menuitems__boxChange} ${
              display === 0 ? `${s.menuitems__min}` : ""
            }`}
            onClick={changeDispaly}
          >
            <span className={s.menuitems__changebtn}></span>
          </div>
        </div>
        <h4 className={s.menuitems__title}>Піца</h4>
        { items.length > 0 ? 
        items?.map((el) => (
          <Menuitem triger={display} dish={el} key={el.id} />
        )): (<>Страви ще не додані</>)}
      </section>
    );
  }
}
