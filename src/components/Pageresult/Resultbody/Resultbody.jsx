import Link from "next/link";

import s from "./Resultbody.module.scss";
import { useAppDispatch } from "@/hooks/redux";

export default function Resultbody({ answer, venueId, tableId}) {
  const dispatch = useAppDispatch();
  const methodSlice = () => {
    if(answer.slice) {
      dispatch(answer.slice())
    }
  }

  return (
    <>
        <div className={s.pageresult}>
          {answer.svg}
          <h6 className={s.pageresult__title}>{answer.title}</h6>
          <p className={s.pageresult__text}>{answer.text}</p>
          {answer.btn ? (<Link onClick={methodSlice} className={s.pageresult__btn} href={`/${venueId}/${tableId}`}>{answer.btn}</Link>) : ''}
        </div>
    </>
  );
}
