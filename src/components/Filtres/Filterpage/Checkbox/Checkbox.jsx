import { useEffect, useState } from "react";
import s from "./Checkbox.module.scss";
import { useAppDispatch } from "@/hooks/redux";
import { changeFilter } from "@/store/setFilter/setFilter";

export default function Checkbox({ id, name }) {
  const [checkbox, setCheckbox] = useState(false);
  const dispatch = useAppDispatch();
 
  
 
  useEffect(() => {
    dispatch(changeFilter({name: id, value: checkbox}));
  }, [checkbox])
  
  


  let checkState = () => {
    checkbox ? setCheckbox(false) : setCheckbox(true);
  }

  return (
    <div className={s.checkbox}>
      <div className={s.checkbox__alergen}>
        <h6 className={s.checkbox__title}>{name}</h6>
      </div>
      <div className={`${s.checkbox__wrapper} ${checkbox ? `${s.checkbox__active}` : ''}` }>
        <input type="checkbox" value="None" id={id} name="check" />
        <label htmlFor={id} onClick={checkState}></label>
      </div>
    </div>
  );
}
