"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./OrderFooter.module.scss";
import ChoiceMethods from "@/components/Order/ChoiceMethods/ChoiceMethods";
import Total from "@/components/Total/Total";
import PaymentMethod from "@/components/PaymentMethod/PaymentMethod";
import DeliveryForm from "@/components/DeliveryForm/DeliveryForm";
import {
  changeChoice,
  giveTips,
  setPaymentMethod,
} from "@/store/setOrder/setOrder";
import OrderBtn from "@/components/OrderBtn/OrderBtn";
import { fetchOrder } from "@/store/setOrder/orderApi";
import { useEffect } from "react";
import { setPaymentStatus } from "@/store/setBasket/setBasket";

export default function OrderFooter() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const {
    allAmount,
    choiceMethod,
    items,
    delivery,
    tips,
    amount,
    paymentMethod,
  } = selector((state) => state.setOrder);
  const { venueId, tableId, methodOrder } = selector((state) => state.menu);
  const { orderId, isPaid } = selector((state) => state.setBasket);

  useEffect(() => {
    dispatch(changeChoice(false));
    if (orderId) {
      dispatch(giveTips({ inputTips: false, actualTips: 0 }));
    }
  }, [amount]);

  const creatData = () => {
    let dishList = [];
    items.map((el) => {
      let addons = [];
      el.addons.map((ad) => {
        addons.push({
          addonId: ad.id,
          addonQuantity: ad.quantity,
        });
      });
      let item = {
        dishId: el.id,
        quantity: el.quantity,
        addons: addons,
        comment: el.clientCooment,
      };
      dishList.push(item);
    });
    if (!orderId) {
      return {
        dishList: dishList,
        isAllTogether: delivery,
        isToGo: methodOrder,
        paymentMethodId: paymentMethod,
        tips: tips,
      };
    } else {
      return {
        updateDishList: [],
        deleteDishList: [],
        createDishList: dishList,
        isToGo: methodOrder,
        paymentMethodId: paymentMethod,
        tips: tips,
      };
    }
  };

  const objMethod = {
    1: "CASH",
    2: "TERMINAL",
    3: "ONLINE",
  };

  const postOrder = () => {
    const data = creatData();
    if (items.length > 0) {
      dispatch(
        fetchOrder({
          orderId: orderId,
          venueId: venueId,
          tableId: tableId,
          data: data,
          request: {
            request: objMethod[paymentMethod],
          },
        })
      );
    }
    if (choiceMethod) {
      dispatch(setPaymentStatus(true));
      localStorage.setItem("paymentStatus", true);
      localStorage.setItem("orders", "orderId");
    }
  };

  return (
    <div className={s.orderFooter}>
      <Total total={allAmount} />
      {!orderId && isPaid == null ? (
        <ChoiceMethods
          firstmethod={"Cплатити потім"}
          lastmethod={"Сплтатити зараз"}
          svg={false}
        />
      ) : (
        ""
      )}
      {!orderId && isPaid == null ? (
        <PaymentMethod
          tips={tips}
          tipsDispatch={giveTips}
          dispatchMethod={setPaymentMethod}
          amount={amount}
        />
      ) : (
        ""
      )}

      <DeliveryForm />

      <OrderBtn
        setData={postOrder}
        title={choiceMethod ? "Замовити та сплатити" : "Замовити"}
      />
    </div>
  );
}
