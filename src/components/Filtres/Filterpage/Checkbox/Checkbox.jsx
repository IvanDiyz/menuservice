import { useEffect, useState } from "react";
import s from "./Checkbox.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeFilter, hasTrueFilter } from "@/store/setFilter/setFilter";

export default function Checkbox({ id, name }) {
  const [checkbox, setCheckbox] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { filters } = selector(state => state.setFilter)
  let stateFiltres;
 
  useEffect(() => {
    dispatch(changeFilter({name: id, bool: checkbox}));
  }, [checkbox])
  
  useEffect(() => {
    hasBoolFilter(filters);
    dispatch(hasTrueFilter(stateFiltres))
  }, [filters])

  //check an object to see if it contains at least one true
  function hasBoolFilter(filters) {
    for (const filter in filters) {
      if (filters[filter] === true) {
        return stateFiltres = true;
      } else {
        stateFiltres = false;
      }
      console.log('bool',stateFiltres);
    }
  }


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
