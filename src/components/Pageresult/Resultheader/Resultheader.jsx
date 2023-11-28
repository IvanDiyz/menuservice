import Link from "next/link";

import s from "./Resultheader.module.scss";
import { useAppDispatch } from "@/hooks/redux";

export default function Resultheader({ result, venueId, tableId, slice }) {
  const dispatch = useAppDispatch();
  const methodSlice = () => {
    if(slice) {
      dispatch(slice())
    }
  }
  return (
      <header className={s.header}>
        <h4 className={s.header__wrappertitle}>{result}</h4>
        <Link onClick={methodSlice} className={s.header__close} href={`/${venueId}/${tableId}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="close">
              <path
                id="Vector"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="black"
              />
            </g>
          </svg>
        </Link>
      </header>
  );
}
