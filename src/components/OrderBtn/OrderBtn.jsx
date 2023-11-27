"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import s from "./OrderBtn.module.scss";


const OrderBtn = ({ title, setData }) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const {items} = selector(state => state.setOrder)

  return (
    <div className={s.orderFooter__btn}>
      <button onClick={setData}>{title}</button>
    </div>
  );
};

export default OrderBtn;
