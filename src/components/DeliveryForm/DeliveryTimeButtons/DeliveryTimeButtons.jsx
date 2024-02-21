import s from "./DeliveryTimeButtons.module.scss";

const DeliveryTimeButtons = ({
  specifiedDeliveryTime,
  setSpecifiedDeliveryTime,
  setValue,
}) => {
  const handleDeliveryTimeChange = (specified) => {
    if (specified) {
      setSpecifiedDeliveryTime(true);
    } else {
      setValue("deliveryTime", "Якомога швидше");
      setSpecifiedDeliveryTime(false);
    }
  };

  return (
    <div className={`${s.deliveryTimeButtonWrapper}`}>
      <button
        className={`${s.deliveryTimeButton} ${
          specifiedDeliveryTime ? null : `${s.active}`
        }`}
        onClick={() => handleDeliveryTimeChange(false)}
        type="button"
      >
        Як умога швидше
      </button>
      <button
        className={`${s.deliveryTimeButton} ${
          specifiedDeliveryTime ? `${s.active}` : null
        }`}
        onClick={() => handleDeliveryTimeChange(true)}
        type="button"
      >
        У вказаний час
      </button>
    </div>
  );
};

export default DeliveryTimeButtons;
