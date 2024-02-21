import s from "./DeliveryForm.module.scss";
import { useForm } from "react-hook-form";
import DeliveryInput from "../DeliveryForm/DeliveryInput/DeliveryInput";

const DeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className={s.deliveryFormWrapper}>
      <h2 className={s.deliveryFormTitle}>Інформація для доставки</h2>
      <form className={s.deliveryForm} onSubmit={handleSubmit(onSubmit)}>
        <DeliveryInput
          register={register}
          id="name"
          label="Ім’я"
          name="name"
          type="text"
        />
        <DeliveryInput
          register={register}
          id="phone"
          label="Номер телефону"
          name="phone"
          type="tel"
        />
        <DeliveryInput
          register={register}
          id="address"
          label="Адреса доставки"
          name="address"
          type="text"
        />
        <DeliveryInput
          register={register}
          id="address_details"
          label="Номер квартири, поверх, офіс"
          name="address_details"
          type="text"
        />
        <DeliveryInput
          register={register}
          id="deliveryTime"
          label="Час доставки"
          name="deliveryTime"
          type="time"
        />
        <DeliveryInput
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
