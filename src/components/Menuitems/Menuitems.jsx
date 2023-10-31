"use client";
import { useEffect, useState } from "react";
import Menuitem from "./Menuitem/Menuitem";
import s from "./Menuitems.module.scss";
import { useAppSelector } from "@/hooks/redux";

export default function Menuitems() {
  const selector = useAppSelector;
  const [display, setDispaly] = useState(1);
  const [filtersDish, setFiltersDish] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { items, total, limit, currentPage } = selector(
    (state) => state.getDishis.dishis
  );
  const { stateDishis } = selector((state) => state.getDishis);
  const { filters, stateFilters } = selector((state) => state.setFilter);

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
    if(stateFilters) {
      setDataLoaded(false);
      let filteredItems = items?.filter((el) => {
        if (filters.alergen && el.isAllergen) {
          return true;
        }
        // if (filters.vegetarian && el.isVegetarian) {
          //   return true;
          // }
          if (filters.spicy && el.isSpicy) {
            return true;
          }
          return false;
        });
        setFiltersDish(filteredItems)
        setDataLoaded(true);
        console.log('filtres', filtersDish);
    }

  }, [stateFilters, filters, items]);

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
        {stateFilters && filtersDish.length > 0 ? filtersDish.map((el) => (
            <Menuitem triger={display} dish={el} key={el.id} />
          )) :
        items.length > 0 ? (
          items?.map((el) => (
            <Menuitem triger={display} dish={el} key={el.id} />
          ))
        ) : (
          <>Страви ще не додані</>
        )}
      </section>
    );
  }
}
