"use client"
import { useState } from "react";
import Filterbtn from "./Filterbtn/Filterbtn";
import Filterscroll from "./Filterscroll/Filterscroll";
import Filterpage from "./Filterpage/Filterpage";

import s from "./Filtres.module.scss";

export default function Filtres() {
  const [filter, setFilter] = useState(false);

  let filterState = () => {
    filter ? setFilter(false) : setFilter(true);
  }

  return (
    <section className={s.filtres}>
      <Filterbtn filterState={filterState}/>
      <Filterscroll />
      <div className={`${s.filtres__page} ${filter ? `${s.filtres__pageOpen}` : ''}` }>
        <Filterpage changState={filterState}/>
      </div>
    </section>
  );
}
