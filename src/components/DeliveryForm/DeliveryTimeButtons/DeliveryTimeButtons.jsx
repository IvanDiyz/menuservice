'use client'
import { useEffect } from "react";
import s from "./DeliveryTimeButtons.module.scss";
import { setFastPossible } from "@/store/getClientInfo/getClientInfo";
import { useAppDispatch } from "@/hooks/redux";

const DeliveryTimeButtons = ({
  specifiedDeliveryTime,
  setSpecifiedDeliveryTime,
  setValue,
}) => {
  const dispatch = useAppDispatch();
  const handleDeliveryTimeChange = () => {
    setSpecifiedDeliveryTime((prevState) => !prevState);
    console.log('prevState', specifiedDeliveryTime)
    dispatch(setFastPossible(specifiedDeliveryTime));
  }

  useEffect(() => {
    !specifiedDeliveryTime
      ? setValue("deliveryTime", "Якомога шивдше")
      : setValue("deliveryTime", "");
  }, [specifiedDeliveryTime]);

  return (
    <div className={`${s.deliveryTimeButtonWrapper}`}>
      <button
        className={`${s.deliveryTimeButton} ${
          specifiedDeliveryTime ? null : `${s.active}`
        }`}
        onClick={handleDeliveryTimeChange}
        type="button"
        disabled={!specifiedDeliveryTime}
      >
        Якомога швидше
      </button>
      <button
        className={`${s.deliveryTimeButton} ${
          specifiedDeliveryTime ? `${s.active}` : null
        }`}
        onClick={handleDeliveryTimeChange}
        type="button"
        disabled={specifiedDeliveryTime}
      >
        У вказаний час
      </button>
    </div>
  );
};

export default DeliveryTimeButtons;
