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
      <h2>Інформація для доставки</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DeliveryInput register={register} id="name" label="Ім’я" name="name" />
        <DeliveryInput
          register={register}
          id="phone"
          label="Номер телефону"
          name="phone"
        />
        <DeliveryInput
          register={register}
          id="address"
          label="Адреса доставки"
          name="address"
        />
        <DeliveryInput
          register={register}
          id="deliveryTime"
          label="Час доставки"
          name="deliveryTime"
        />
        <DeliveryInput
          register={register}
          id="commentToDelivery"
          label="Коментар для кур’єра"
          name="commentToDelivery"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default DeliveryForm;
