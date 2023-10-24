import Link from "next/link";

import s from "./Filterpage.module.scss";
import Filterheader from "./Filterheader/Filterheader";
import Filterbody from "./Filterbody/Filterbody";

export default function Filterpage({changState}) {
  return (
    <div className={s.filterpage}>
      <Filterheader result={'Фільтр'} changState={changState}/>
      <Filterbody />
    </div>
  );
}
