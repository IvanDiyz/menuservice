import s from "./DeliveryInput.module.scss";

const DeliveryInput = ({ register, label, name }) => {
  return (
    <div className={s.deliveryInputWrapper}>
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} />
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
