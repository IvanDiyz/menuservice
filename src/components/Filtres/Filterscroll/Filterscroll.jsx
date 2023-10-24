import Link from "next/link";

import s from "./Filterscroll.module.scss";

export default function Filterscroll() {
  return (
    <ul className={s.filterscroll}>
      <li className={`${s.filterscroll__item} ${s.active}`}>Піца</li>
      <li className={s.filterscroll__item}>Суші</li>
      <li className={s.filterscroll__item}>Салати</li>
      <li className={s.filterscroll__item}>Головні страви</li>
    </ul>
  );
}
