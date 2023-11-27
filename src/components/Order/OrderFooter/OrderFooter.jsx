"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./OrderFooter.module.scss";
import ChoiceMethods from "@/components/Order/ChoiceMethods/ChoiceMethods";
import Total from "@/components/Total/Total";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
import { setPaymentMethod } from "@/store/setOrder/setOrder";
import OrderBtn from "@/components/OrderBtn/OrderBtn";
import { fetchOrder } from '@/store/setOrder/orderApi';

export default function OrderFooter() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { allAmount, choiceMethod, items, delivery, tips } = selector(
    (state) => state.setOrder
  );
  const {venueId, tableId} = selector(state => state.menu)

  const creatData = () => {
    let dishList = [];
    items.map(el => {
      let addons = []
      el.addons.map(ad => {
        addons.push({
          addonId: ad.id,
          addonQuantity: ad.quantity,
        })
      })
      let item = {
        dishId: el.id,
        quantity: el.quantity,
        addons: addons,
        comment: el.clientCooment,
      }
      dishList.push(item)
    })
    return {
      dishList: dishList,
      isAllTogether: delivery,
      isToGo: delivery, // узнать что это такое
      paymentMethodId: 1, //узнать какие есть методы
      tips: tips,
    }
  }

  const postOrder = () => {
    const data = creatData();
    dispatch(fetchOrder({
      venueId: venueId,
      tableId: tableId,
      data: data,
    }))
    console.log(creatData())
  }
  
  return (
    <div className={s.orderFooter}>
      <Total total={allAmount} />
      <ChoiceMethods
        firstmethod={"Cплатити потім"}
        lastmethod={"Сплтатити зараз"}
        svg={false}
      />
      <PaymentMethod dispatchMethod={setPaymentMethod}/>
      <OrderBtn setData={postOrder} title={choiceMethod ? 'Замовити та сплатити' : 'Замовити'}/>
    </div>
  );
}
