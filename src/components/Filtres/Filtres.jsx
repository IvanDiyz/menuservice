"use client"
import { useState } from "react";
import Filterbtn from "./Filterbtn/Filterbtn";
import Filterscroll from "./Filterscroll/Filterscroll";
import Filterpage from "./Filterpage/Filterpage";

import s from "./Filtres.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { movePage } from "@/store/setFilter/setFilter";

export default function Filtres() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const { filterPage } = selector(state => state.setFilter)
  const [filter, setFilter] = useState(false);

  let filterState = () => {
    
    filterPage ? dispatch(movePage(false)) : dispatch(movePage(true));
  }

  return (
    <section className={s.filtres}>
      <Filterbtn filterState={filterState}/>
      <Filterscroll />
      <div className={`${s.filtres__page} ${filterPage ? `${s.filtres__pageOpen}` : ''}` }>
        <Filterpage changState={filterState}/>
      </div>
    </section>
  );
}
