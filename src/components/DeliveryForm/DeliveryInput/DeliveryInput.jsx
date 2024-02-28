'use client'
import DeliveryTimeButtons from "@/components/DeliveryForm/DeliveryTimeButtons/DeliveryTimeButtons";
import s from "./DeliveryInput.module.scss";
import { useAppDispatch } from "@/hooks/redux";
import { chageFrom, resetState } from "@/store/getClientInfo/getClientInfo";
import { useEffect, useState } from "react";

const DeliveryInput = ({
  deliveryFormSchema,
  register,
  label,
  name,
  type,
  setSpecifiedDeliveryTime,
  specifiedDeliveryTime,
  defaultValue,
  setValue,
}) => {
  const keysValids = ['name', 'phone', 'address', 'address_details'];
  const dispatch = useAppDispatch();
  const [value, setValues] = useState(name === "phone" ? '+38' : '');
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
     dispatch(resetState());
    }
  }, [])

  useEffect(() => {
    if(error == null && name != 'deliveryTime') {
      dispatch(chageFrom({name, value, keysValids}));
    }
    if(error) {
      dispatch(chageFrom({name, value: null, keysValids}));
    }
  }, [error])
  
  useEffect(() => {
    if(name === 'deliveryTime') chekingTime();
  }, [specifiedDeliveryTime, value])
  
  const handleInputChange = (event) => {
    let velueInput = event.target?.value;
    if(name === "phone") {
      velueInput = velueInput.replace(/\s/g, '');
      if (!velueInput.startsWith('+38')) {
        velueInput = '+38';
      }
    }
    setValues(velueInput)
  };
  
  const chekingTime = () => {
    if(specifiedDeliveryTime && value) {
      dispatch(chageFrom({name, value, keysValids}));
    } else {
      dispatch(chageFrom({name, value: '', keysValids}));
      setError(false)
      setValues('')
    }
  }
  
  const onBlurValidation = async (fieldName, value) => {
    try {
      await deliveryFormSchema.fields[fieldName]?.validate(value);
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <div className={`${s.deliveryInputWrapper} ${error && `${s.error}`}`}>
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
        value={value}
        defaultValue={defaultValue}
        className={`${s.deliveryInput} ${
          !specifiedDeliveryTime && name === "deliveryTime"
            ? `${s.deliveryInputHidden}`
            : null
        }`}
        {...register(name)}
        type={type}
        onChange={handleInputChange}
        onBlur={() => onBlurValidation(name, value)}
      />
    </div>
  );
};

export default DeliveryInput;
