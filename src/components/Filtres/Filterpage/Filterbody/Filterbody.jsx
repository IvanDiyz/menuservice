'use client'
import s from "./Filterbody.module.scss";
import Checkbox from "@/components/Filtres/Filterpage/Checkbox/Checkbox";
import Multiselect from "@/components/Filtres/Filterpage/Multiselect/Multiselect";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hasTrueFilter } from "@/store/setFilter/setFilter";
import { useEffect } from "react";

export default function Filterbody() {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { filters } = selector(state => state.setFilter)
  let statelocalFiltres;
  const params = [{title: 'за зростанням', article: 'ASC'}, {title: 'за зменшенням', article: 'DESC'}];

  useEffect(() => {
    hasBoolFilter(filters);
    dispatch(hasTrueFilter(statelocalFiltres))
  }, [filters])


  //check an object to see if it contains at least one true
  function hasBoolFilter(filters) {
    for (const filter in filters) {
      if (filters[filter] != false) { // измениь проверку на != false когда измениться ендпоинт по фильтрам
        return statelocalFiltres = true;
      } else {
        statelocalFiltres = false;
      }
    }
  }

  return (
    <div className={s.filter}>
      <Checkbox id={'alergen'} name={'Алергени'}/>
      <Checkbox id={'vegan'} name={'Вегетаріанське'}/>
      <Checkbox id={'spicy'} name={'Гостре'}/>
      <Multiselect label={'Час приготування'} name={'cookingTime'} paramsClient={params}/>
      <Multiselect label={'Ціна'} name={'cost'} paramsClient={params}/>
    </div>
  );
}
