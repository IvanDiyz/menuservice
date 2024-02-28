"use client";

import s from "./DeliveryForm.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DeliveryInput from "../DeliveryForm/DeliveryInput/DeliveryInput";
import { deliveryFormSchema } from "@/utils/yupSchemas";

const DeliveryForm = () => {
  const [specifiedDeliveryTime, setSpecifiedDeliveryTime] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deliveryFormSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className={s.deliveryFormWrapper}>
      <div className={s.deliveryFormTitleWrapper}>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="bike-fast" clipPath="url(#clip0_369_530)">
            <path
              id="Vector"
              d="M16.5 1.2C15.5 1.2 14.7 2 14.7 3C14.7 4 15.5 4.8 16.5 4.8C17.5 4.8 18.3 4 18.3 3C18.3 2 17.5 1.2 16.5 1.2ZM12.9 4.1C12.43 4.1 12 4.29 11.7 4.6L8 8.29C7.69 8.6 7.5 9 7.5 9.5C7.5 10.13 7.83 10.66 8.35 10.97L11.7 13V18H13.5V11.5L11.25 9.85L13.57 7.5L15.3 10H19.5V8.2H16.3L14.36 4.93C14.07 4.43 13.5 4.1 12.9 4.1ZM5.5 12C2.74 12 0.5 14.24 0.5 17C0.5 19.76 2.74 22 5.5 22C8.26 22 10.5 19.76 10.5 17C10.5 14.24 8.26 12 5.5 12ZM5.5 20.5C3.57 20.5 2 18.93 2 17C2 15.07 3.57 13.5 5.5 13.5C7.43 13.5 9 15.07 9 17C9 18.93 7.43 20.5 5.5 20.5ZM19.5 12C16.74 12 14.5 14.24 14.5 17C14.5 19.76 16.74 22 19.5 22C22.26 22 24.5 19.76 24.5 17C24.5 14.24 22.26 12 19.5 12ZM19.5 20.5C17.57 20.5 16 18.93 16 17C16 15.07 17.57 13.5 19.5 13.5C21.43 13.5 23 15.07 23 17C23 18.93 21.43 20.5 19.5 20.5ZM7.35355 7.64644C7.15829 7.8417 6.84171 7.8417 6.64645 7.64644L5.79289 6.79288C5.60536 6.60535 5.5 6.35099 5.5 6.08577V4.89926C5.5 4.64292 5.59844 4.39636 5.775 4.21051L8.00682 1.86123C8.19655 1.66152 8.51206 1.65288 8.71243 1.84191L10.6256 3.64674C10.8306 3.84015 10.8353 4.16469 10.636 4.36399L9.5 5.49999L7.35355 7.64644Z"
              fill="#0085FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_369_530">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <h2 className={s.deliveryFormTitle}>Інформація для доставки</h2>
      </div>
      <form className={s.deliveryForm} onSubmit={handleSubmit(onSubmit)}>
        <DeliveryInput
          deliveryFormSchema={deliveryFormSchema}
          register={register}
          id="name"
          label="Ім’я"
          name="name"
          type="text"
          error={errors.name?.message}
          required="required"
          />
        <DeliveryInput
          deliveryFormSchema={deliveryFormSchema}
          register={register}
          id="phone"
          label="Номер телефону"
          name="phone"
          type="tel"
          error={errors.phone?.message}
          required="required"
          />
        <DeliveryInput
          deliveryFormSchema={deliveryFormSchema}
          register={register}
          id="address"
          label="Адреса доставки"
          name="address"
          type="text"
          error={errors.address?.message}
          required="required"
          />
        <DeliveryInput
          deliveryFormSchema={deliveryFormSchema}
          register={register}
          id="address_details"
          label="Номер квартири, поверх, офіс"
          name="address_details"
          type="text"
          error={errors.address_details?.message}
          required="required"
          />
        <DeliveryInput
          deliveryFormSchema={deliveryFormSchema}
          setValue={setValue}
          specifiedDeliveryTime={specifiedDeliveryTime}
          setSpecifiedDeliveryTime={setSpecifiedDeliveryTime}
          register={register}
          id="deliveryTime"
          label="Час доставки"
          name="deliveryTime"
          type={!specifiedDeliveryTime ? "text" : "time"}
          error={errors.deliveryTime?.message}
          required="required"
          />
        <DeliveryInput
          deliveryFormSchema={deliveryFormSchema}
          register={register}
          id="commentToDelivery"
          label="Коментар для кур’єра"
          name="commentToDelivery"
          type="text"
          />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default DeliveryForm;
