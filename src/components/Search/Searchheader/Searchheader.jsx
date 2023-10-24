import s from "./Searchheader.module.scss";

export default function Searchheader({ result, changState }) {
  return (
      <header className={s.header}>
        <h4 className={s.header__wrappertitle}>{result}</h4>
        <div className={s.header__close}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={changState}
          >
            <g id="close">
              <path
                id="Vector"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="black"
              />
            </g>
          </svg>
        </div>
      </header>
  );
}
