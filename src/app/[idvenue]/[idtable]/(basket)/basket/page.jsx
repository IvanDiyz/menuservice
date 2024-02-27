"use client"
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import BasketItems from "@/components/Basket/BasketItems/BasketItems";
import s from "./page.module.scss";
import { useAppSelector } from "@/hooks/redux";
import { setCheck } from "@/store/setBasket/setBasket";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";

export default function Basket() {
  const selector = useAppSelector;
  const  { check, paymentStatus } = selector(state => state.setBasket)
  const [status, setStatus] = useState(false);
  
  useEffect(() => {
    if(paymentStatus) {
      setStatus(true);
    }
  }, [paymentStatus])
  useEffect(() => {
    if(status) {
      setTimeout(() => {
        setStatus(false);
      }, 2000)
    }
  }, [status])

  const styleMethod = {
    active : {
      paddingLeft: '6vw',
      paddingRight: '6vw',
    },
    disable : {
      paddingLeft: '6vw',
      paddingRight: '6vw',
    }
  }

  if(status) {
    return (
      <Loading text={'Зачекайте хвилинку, офіціант зараз підійде'}/>
    )
  } else {
    return (
      <div className={s.order}>
       <OrderMethods style={styleMethod} keySlice={check} dispatchMethod={setCheck} firstDescription={'payAll'} lastDescription={'splitPay'} firstmethod={'Сплатити за все'} lastmethod={'Розділити чек'} svg={false}/>
       <h4 className={s.title}>Відвідувач №1</h4>
       <BasketItems />
      </div>
    );
  }
}
