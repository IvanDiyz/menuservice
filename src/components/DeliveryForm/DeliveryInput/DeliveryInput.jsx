'use client'
import DeliveryTimeButtons from "@/components/DeliveryForm/DeliveryTimeButtons/DeliveryTimeButtons";
import s from "./DeliveryInput.module.scss";
import { useAppDispatch } from "@/hooks/redux";
import { chageFrom } from "@/store/getClientInfo/getClientInfo";
import { useEffect, useState } from "react";

const DeliveryInput = ({
  register,
  label,
  name,
  type,
  setSpecifiedDeliveryTime,
  specifiedDeliveryTime,
  defaultValue,
  setValue,
  error,
}) => {

  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  useEffect(() => {
    if(!specifiedDeliveryTime && name === "deliveryTime") {
      dispatch(chageFrom({name, value: null}));
    }
  }, [specifiedDeliveryTime])
  const handleInputChange = (event) => {
    let velueInput = event.target.value;
    if(name === "phone") {
      velueInput = velueInput.replace(/\s/g, '');
      console.log(velueInput)
    }
    dispatch(chageFrom({name, value: velueInput}));
    setPhone(velueInput)
  };


  return (
    <div className={`${s.deliveryInputWrapper} ${error && `${s.error}`}`}>
      <label htmlFor={name} className={s.deliveryInputLabel}>
        {label}
        {error && <p>{error}</p>}
      </label>

      {name === "deliveryTime" ? (
        <DeliveryTimeButtons
          specifiedDeliveryTime={specifiedDeliveryTime}
          setSpecifiedDeliveryTime={setSpecifiedDeliveryTime}
          setValue={setValue}
        />
      ) : null}

      <input
      value={phone}
        defaultValue={defaultValue}
        className={`${s.deliveryInput} ${
          !specifiedDeliveryTime && name === "deliveryTime"
            ? `${s.deliveryInputHidden}`
            : null
        }`}
        {...register(name)}
        type={type}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DeliveryInput;
