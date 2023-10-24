import s from "./Openedcontact.module.scss";

const Openedcontact = () => {
  return (
    <div className={s.contact}>
      <div className={s.contact__box}>
        <h6 className={s.contact__boxTitle}>Контактні дані</h6>
        <p className={s.contact__boxText}>
          вул. Степана Бандери, 13, Київ, Україна, 02000
        </p>
        <p className={s.contact__boxText}>099 199 99 99</p>
      </div>
      <div className={s.contact__box}>
        <h6 className={s.contact__boxTitle}>Робочий час</h6>
        <p className={s.contact__boxText}>08:00 - 22:00</p>
      </div>
    </div>
  );
};

export default Openedcontact;
