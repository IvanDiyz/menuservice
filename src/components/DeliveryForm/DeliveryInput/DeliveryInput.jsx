import DeliveryTimeButtons from "@/components/DeliveryForm/DeliveryTimeButtons/DeliveryTimeButtons";
import s from "./DeliveryInput.module.scss";

const DeliveryInput = ({
  register,
  label,
  name,
  type,
  setSpecifiedDeliveryTime,
  specifiedDeliveryTime,
  defaultValue,
  setValue,
}) => {
  return (
    <div className={s.deliveryInputWrapper}>
      <label htmlFor={name} className={s.deliveryInputLabel}>
        {label}
      </label>

      {name === "deliveryTime" ? (
        <DeliveryTimeButtons
          specifiedDeliveryTime={specifiedDeliveryTime}
          setSpecifiedDeliveryTime={setSpecifiedDeliveryTime}
          setValue={setValue}
        />
      ) : null}

      <input
        defaultValue={defaultValue}
        className={`${s.deliveryInput} ${
          !specifiedDeliveryTime && name === "deliveryTime"
            ? `${s.deliveryInputHidden}`
            : null
        }`}
        {...register(name)}
        type={type}
      />
    </div>
  );
};

export default DeliveryInput;
