"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import s from "./Tips.module.scss";
import { useEffect, useState } from "react";
import { giveTips } from "@/store/setBasket/setBasket";

export default function Tips({ tips }) {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { amount } = selector((state) => state.setBasket);
  const [bool, setTips] = useState(true);
  const [input, setInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [actualTips, setActualTips] = useState(0);

  useEffect(() => {
    if (inputValue && bool) {
      dispatch(
        giveTips({ bool: bool, inputValue: inputValue, inputTips: true })
      );
    } else {
      dispatch(giveTips({ bool, actualTips }));
    }
  }, [bool, actualTips, amount]);
  //отображение карточки чаевых
  const changeTips = () => {
    if (bool) {
      setTips(false);
      setInputValue('')
      setInput(false)
      setActualTips(0);
    } else {
      setTips(true);
    }
  };
  //отображение input для чаевых
  const changeInput = () => {
    if (input) {
      setInput(false);
      dispatch(giveTips({ bool, actualTips: 0 }));
    } else {
      setInput(true);
      setActualTips(0);
    }
  };
  //изменение value в input
  const handleInputChange = (e) => {
    setTips(true)
    //разрешить только числа
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
    dispatch(giveTips({ inputTips: true, inputValue: numericValue }));
    console.log("inputValue", numericValue);
  };

  const getTicketTips = (e) => {
    setTips(true);
    setInput(false);
    setInputValue("");
    console.log(e.target.firstElementChild.textContent.match(/\d+/)[0]);
    let actual = e.target.firstElementChild.textContent.match(/\d+/)[0];
    actual == actualTips ? setActualTips(0) : setActualTips(actual);
  };

  return (
    <div className={s.tips}>
      <h4 className={s.tips__title}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="circle-multiple-outline">
            <path
              id="Vector"
              d="M15 4C17.1217 4 19.1566 4.84285 20.6569 6.34315C22.1571 7.84344 23 9.87827 23 12C23 14.1217 22.1571 16.1566 20.6569 17.6569C19.1566 19.1571 17.1217 20 15 20C12.8783 20 10.8434 19.1571 9.34315 17.6569C7.84285 16.1566 7 14.1217 7 12C7 9.87827 7.84285 7.84344 9.34315 6.34315C10.8434 4.84285 12.8783 4 15 4ZM15 18C16.5913 18 18.1174 17.3679 19.2426 16.2426C20.3679 15.1174 21 13.5913 21 12C21 10.4087 20.3679 8.88258 19.2426 7.75736C18.1174 6.63214 16.5913 6 15 6C13.4087 6 11.8826 6.63214 10.7574 7.75736C9.63214 8.88258 9 10.4087 9 12C9 13.5913 9.63214 15.1174 10.7574 16.2426C11.8826 17.3679 13.4087 18 15 18ZM3 12C3 14.61 4.67 16.83 7 17.65V19.74C3.55 18.85 1 15.73 1 12C1 8.27 3.55 5.15 7 4.26V6.35C4.67 7.17 3 9.39 3 12Z"
              fill="#FFC700"
            />
          </g>
        </svg>
        Залишити чайові?
      </h4>
      <div className={s.tips__items}>
        <span
          className={`${s.tips__item} ${
            Math.floor((amount * actualTips) / 100) ==
              Math.floor(amount * 0.05) && amount * 0.05 != 0
              ? `${s.tips__activeItem}`
              : ""
          }`}
          id={Math.floor(amount * 0.05)}
          onClick={getTicketTips}
        >
          {amount ? `${Math.floor(amount * 0.05)}₴` : ""}
          <span className={s.tips__procent}>(5%)</span>
        </span>
        <span
          className={`${s.tips__item} ${
            Math.floor((amount * actualTips) / 100) ==
              Math.floor(amount * 0.1) && amount * 0.05 != 0
              ? `${s.tips__activeItem}`
              : ""
          }`}
          id={Math.floor(amount * 0.1)}
          onClick={getTicketTips}
        >
          {amount ? `${Math.floor(amount * 0.1)}₴` : ""}
          <span className={s.tips__procent}>(10%)</span>
        </span>
        <span
          className={`${s.tips__item} ${
            Math.floor((amount * actualTips) / 100) ==
              Math.floor(amount * 0.15) && amount * 0.05 != 0
              ? `${s.tips__activeItem}`
              : ""
          }`}
          id={Math.floor(amount * 0.15)}
          onClick={getTicketTips}
        >
          {amount ? `${Math.floor(amount * 0.15)}₴` : ""}
          <span className={s.tips__procent}>(15%)</span>
        </span>
      </div>
      <div className={s.tips__control}>
        <span
          className={`${s.tips__btn} ${!bool ? `${s.tips__btnActive}` : ""}`}
          onClick={changeTips}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="close">
              <path
                id="Vector"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#FFFCF8"
              />
            </g>
          </svg>
          Без чайових
        </span>
        <span
          className={`${s.tips__btn} ${input ? `${s.tips__btn__input}` : ""}`}
        >
          <span
            className={s.tips__btn__close}
            onClick={() => {
              changeInput();
              setInputValue("");
            }}
          ></span>
          {input ? (
            <input
              className={s.tips__input}
              onChange={handleInputChange}
              value={inputValue}
              placeholder="Ваша сума"
              type="text"
            ></input>
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={changeInput}
              >
                <g id="pencil">
                  <path
                    id="Vector"
                    d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z"
                    fill="black"
                  />
                </g>
              </svg>
              <span onClick={changeInput}>Своя сума</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
