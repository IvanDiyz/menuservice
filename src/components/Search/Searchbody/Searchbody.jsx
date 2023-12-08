"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./Searchbody.module.scss";
import { createRef, useEffect } from "react";
import { changeValue } from "@/store/setSearch/setSearch";
import { fetchSeacrh } from "@/store/setSearch/setSearchApi";
import Menuitem from "@/components/Menuitems/Menuitem/Menuitem";

export default function Searchbody() {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  let refValue = createRef();
  const { searchValue, dishis } = selector((state) => state.setSearch);
  const { actualSection } = selector((state) => state.getDishis);

  useEffect(() => {
    if (searchValue && actualSection) {
      dispatch(fetchSeacrh({ actualSection, searchValue }));
    }
  }, [searchValue]);

  let change = (refValue) => {
    dispatch(changeValue(refValue.current.value));
  };

  return (
    <div className={s.search}>
      <div className={s.search__inputBox}>
        <input
          ref={refValue}
          onChange={() => change(refValue)}
          value={searchValue}
          className={s.search__input}
          type="text"
          placeholder="Я шукаю..."
        />
        <div className={s.search__boxSvg}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.search__svg}
          >
            <g id="magnify">
              <path
                id="Vector"
                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                fill="#696969"
              />
            </g>
          </svg>
        </div>
      </div>
      {}
      {
        actualSection ?
        dishis.map((el) => (
          <Menuitem triger={0} dish={el} key={el.id} />
        )) :
        'Виберіть розділ'
      }
    </div>
  );
}
