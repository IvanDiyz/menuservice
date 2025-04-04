import Link from "next/link";

import s from "./Filterbtn.module.scss";

export default function Filterbtn({filterState}) {
  return (
    <div className={s.filterbtn} onClick={filterState}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="filter">
          <path
            id="Vector"
            d="M14.0001 12V19.88C14.0401 20.18 13.9401 20.5 13.7101 20.71C13.3201 21.1 12.6901 21.1 12.3001 20.71L10.2901 18.7C10.0601 18.47 9.9601 18.16 10.0001 17.87V12H9.9701L4.2101 4.62C3.8701 4.19 3.9501 3.56 4.3801 3.22C4.5701 3.08 4.7801 3 5.0001 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C20.0501 3.56 20.1301 4.19 19.7901 4.62L14.0301 12H14.0001Z"
            fill="black"
          />
        </g>
      </svg>
    </div>
  );
}
