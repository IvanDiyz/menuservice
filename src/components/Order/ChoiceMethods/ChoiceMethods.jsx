"use client"
import { useEffect, useState } from "react";
import s from "./ChoiceMethods.module.scss";
import { useAppDispatch } from "@/hooks/redux";
import { changeChoice, giveTips } from "@/store/setOrder/setOrder";
import { useSelector } from "react-redux";

const ChoiceMethods = ({firstmethod, lastmethod, svg}) => {
  const selector = useSelector;
  const {choiceMethod} = selector(state => state.setOrder)
  const [isActive, setIsActive] = useState(choiceMethod);
  const dispatch = useAppDispatch();

  const toggleOrder = (order) => {
    setIsActive(order)
    dispatch(changeChoice(order))
  }

  useEffect(() => {
    if(isActive == false) {
      dispatch(giveTips({actualTips: 0}))
    }
    setIsActive(choiceMethod)
  }, [choiceMethod])

  return (
    <div className={`${s.orderMethods} ${choiceMethod && (s.orderMethods__active)}`}>
      <div className={`${s.orderMethods__button} ${isActive == false ? s.active : ''}`} onClick={() => toggleOrder(false)}>
          {svg ? <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="silverware-fork-knife">
              <path
                id="Vector"
                d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z"
                
              />
            </g>
          </svg> : ''}
        <button className={s.orderMethods__btn}>{firstmethod}</button>
      </div>
      <div className={`${s.orderMethods__button} ${isActive == true ? s.active : ''}`} onClick={() => toggleOrder(true)}>
        {svg ? <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="moped">
              <path
                id="Vector"
                d="M19 15C19.55 15 20 15.45 20 16C20 16.55 19.55 17 19 17C18.45 17 18 16.55 18 16C18 15.45 18.45 15 19 15ZM19 13C17.34 13 16 14.34 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 14.34 20.66 13 19 13ZM10 6H5V8H10V6ZM17 5H14V7H17V9.65L13.5 14H10V9H6C3.79 9 2 10.79 2 13V16H4C4 17.66 5.34 19 7 19C8.66 19 10 17.66 10 16H14.5L19 10.35V7C19 5.9 18.11 5 17 5ZM7 17C6.45 17 6 16.55 6 16H8C8 16.55 7.55 17 7 17Z"
                
              />
            </g>
          </svg> : ''}
        <button className={s.orderMethods__btn}>{lastmethod}</button>
      </div>
    </div>
  );
};

export default ChoiceMethods;
