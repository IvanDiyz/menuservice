import { changeValue } from "@/store/setSearch/setSearch";
import s from "./Searchheader.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { createRef, useEffect } from "react";
import { clearDishis } from "@/store/setSearch/setSearch";

export default function Searchheader({ result, changState }) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  let refValue = createRef();
  const { searchValue } = selector((state) => state.setSearch);
  let close = () => {
    changState();
    dispatch(changeValue(""));
    dispatch(clearDishis());
  };

  let change = (refValue) => {
    dispatch(changeValue(refValue.current.value));
  };
  
  let remove = () => {
    const newString = '';
    dispatch(changeValue(newString));
  }

  useEffect(() => {
    refValue.current.focus();
  });

  return (
    <div className={s.header}>
      <div className={s.header__inputBox}>
        <div className={s.header__boxSvg}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.header__svg}
          >
            <g id="magnify">
              <path
                id="Vector"
                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                fill="#000"
              />
            </g>
          </svg>
        </div>
        <input
          ref={refValue}
          onChange={() => change(refValue)}
          value={searchValue}
          className={s.header__input}
          type="text"
          placeholder="Пошук в меню"
        />
      </div>
      <div className={s.header__remove} onClick={remove}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="backspace">
            <path
              id="Vector"
              d="M22 3H7C6.31 3 5.77 3.35 5.41 3.88L0 12L5.41 20.11C5.77 20.64 6.31 21 7 21H22C22.5304 21 23.0391 20.7893 23.4142 20.4142C23.7893 20.0391 24 19.5304 24 19V5C24 4.46957 23.7893 3.96086 23.4142 3.58579C23.0391 3.21071 22.5304 3 22 3ZM19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12"
              fill="#FF0000"
            />
          </g>
        </svg>
      </div>
      <div className={s.header__close}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={close}
        >
          <g id="close">
            <path
              id="Vector"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="black"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
