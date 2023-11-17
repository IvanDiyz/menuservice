import Link from "next/link";

import s from "./Resultbody.module.scss";

export default function Resultbody({ answer }) {
  return (
    <>
        <div className={s.pageresult}>
          {answer.svg}
          <h6 className={s.pageresult__title}>{answer.title}</h6>
          <p className={s.pageresult__text}>{answer.text}</p>
          {answer.btn ? (<Link className={s.pageresult__btn} href="/">Оновити</Link>) : ''}
        </div>
    </>
  );
}
