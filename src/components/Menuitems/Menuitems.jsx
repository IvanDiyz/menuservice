"use client";
import { useEffect, useState } from "react";
import Menuitem from "./Menuitem/Menuitem";
import s from "./Menuitems.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchFiltres } from "@/store/setFilter/setFiltresApi";

export default function Menuitems() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const [display, setDispaly] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { items, total, limit, currentPage } = selector(
    (state) => state.getDishis.dishis
  );
  const { stateDishis, actualSection } = selector((state) => state.getDishis);
  const { venueId } = selector((state) => state.menu);
  const { amount } = selector((state) => state.setBasket);
  const { filters, stateFilters, filteredDish } = selector((state) => state.setFilter);

  useEffect(() => {
    // Дождитесь, пока stateDishis станет true, прежде чем установить dataLoaded в true
    if (stateDishis) {
      setDataLoaded(true);
    }
  }, [stateDishis]);

  let changeDispaly = () => {
    if (display !== 0) {
      setDispaly(0);
    } else {
      setDispaly(1);
    }
  };
  //We check whether our dishes contain a filter
  useEffect(() => {
    if (stateFilters) {
      setDataLoaded(false);
      dispatch(fetchFiltres({filters: filters, sectionId: actualSection, venueId: venueId}))
      setDataLoaded(true);
    }
  }, [stateFilters, filters, actualSection]);

  if (!dataLoaded) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <section className={`${s.menuitems} ${amount > 0 ? `${s.menuitems__amount}` : ''}`}>
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
          {stateFilters ? (
            filteredDish.map((el) => (
              <Menuitem triger={display} dish={el} key={el.id} />
            ))
          ) : items.length > 0 ? (
            items?.map((el) => (
              <Menuitem triger={display} dish={el} key={el.id} />
            ))
          ) : (
            <>Страви ще не додані</>
          )}
        </section>
      </>
    );
  }
}
