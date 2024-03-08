"use client";
import { useEffect, useState } from "react";
import Menuitem from "./Menuitem/Menuitem";
import s from "./Menuitems.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchFiltres } from "@/store/setFilter/setFiltresApi";
import { setCurrentPage } from "../../store/getDishis/getDishis";

export default function Menuitems() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const [display, setDispaly] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [setionName, setSetionName] = useState(false);
  const { items, total, limit, pages } = selector(
    (state) => state.getDishis.dishis
  );
  const { sections, menuId } = selector((state) => state.getSections);
  const { stateDishis, actualSection, currentPage, isLoading } = selector(
    (state) => state.getDishis
  );
  const { venueId, titleMethod, licenseType } = selector((state) => state.menu);
  const { amount } = selector((state) => state.setOrder);
  const { filters, stateFilters, filteredDish } = selector(
    (state) => state.setFilter
  );

  useEffect(() => {
    // Дождитесь, пока stateDishis станет true, прежде чем установить dataLoaded в true
    if (stateDishis) {
      setDataLoaded(true);
    }
    const handleScroll = () => {
      // Проверка, достиг ли пользователь конца страницы
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 &&
        currentPage < pages &&
        !isLoading
      ) {
        // Загрузка следующей порции блюд из API
        dispatch(setCurrentPage(currentPage + 1));
      }
    };

    // Добавление обработчика события прокрутки
    window.addEventListener("scroll", handleScroll);

    // Очистка обработчика события при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      dispatch(
        fetchFiltres({
          menuId: menuId,
          filters: filters,
          sectionId: actualSection,
          venueId: venueId,
        })
      );
      setDataLoaded(true);
    }
    if (actualSection) {
      let setion = sections.find((section) => section.id === actualSection);
      setSetionName(setion.name);
    } else {
      setSetionName(false);
    }
  }, [stateFilters, filters, actualSection]);

  if (!dataLoaded) {
    return <></>;
  } else {
    return (
      <>
        <section
          className={`${s.menuitems} ${
            amount > 0 ? `${s.menuitems__amount}` : ""}`}
        >
          <div className={`${s.menuitems__boxTitle} ${
            !titleMethod ? `${s.menuitems__boxTitleLeft}` : ""}`}>
            {titleMethod && (
              <h4 className={s.menuitems__title}>{titleMethod}</h4>
            )}
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
          </div>
          {stateFilters ? (
            filteredDish.map((el) => (
              <Menuitem licenseType={licenseType} triger={display} dish={el} key={el.id} />
            ))
          ) : items.length > 0 ? (
            items?.map((el) => (
              <Menuitem licenseType={licenseType} triger={display} dish={el} key={el.id} />
            ))
          ) : (
            <div className={s.menuitems__dishNotFound}>Страви ще не додані</div>
          )}
        </section>
      </>
    );
  }
}
