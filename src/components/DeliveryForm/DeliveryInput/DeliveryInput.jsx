import s from "./DeliveryInput.module.scss";

const DeliveryInput = ({ register, label, name, type }) => {
  return (
    <div className={s.deliveryInputWrapper}>
      <label htmlFor={name} className={s.deliveryInputLabel}>
        {label}
      </label>
      <input {...register(name)} className={s.deliveryInput} type={type} />
      {type === "time" ? (
        <div className={s.deliveryTimeButtonWrapper}>
          <button className={s.deliveryTimeButton} type="button">
            Як умога швидше
          </button>
          <button className={s.deliveryTimeButton} type="button">
            У вказаний час
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryInput;

//  <label className={s.registrationFormLabel} htmlFor={name}>
//         {label}
//       </label>
//       <input
//         className={`${s.registrationFormInput} ${error ? s.inputError : ""}`}
//         type={type}
//         placeholder={placeholder}
//         id={id}
//         name={name}
//         onChange={onChange}
//         defaultValue={defaultValue}
//         {...register(name)}
//       />
