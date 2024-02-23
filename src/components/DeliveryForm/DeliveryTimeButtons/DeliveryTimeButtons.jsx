import { useEffect } from "react";
import s from "./DeliveryTimeButtons.module.scss";

const DeliveryTimeButtons = ({
  specifiedDeliveryTime,
  setSpecifiedDeliveryTime,
  setValue,
}) => {
  const handleDeliveryTimeChange = () =>
    setSpecifiedDeliveryTime((prevState) => !prevState);

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
