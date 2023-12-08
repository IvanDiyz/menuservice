import s from "./ClientInfo.module.scss";
import Image from "next/image";

const ClientInfo = ({
  name,
  logoUrl,
  openingTime,
  closingTime,
  types,
  image,
  photoUrl
}) => {
  return (
    <div className={`${s.clientinfo} ${image ? `${s.clientInfo__bcg}` : ""}`}>
      <div
        className={s.clientinfo__background}
        style={{
          backgroundImage: `url(${
            photoUrl ? photoUrl : "/images/services/background.jpg"
          })`,
        }}
      ></div>
      <div
        className={s.clientinfo__logo}
        style={{
          backgroundImage: `url(${
            logoUrl ? logoUrl : "/images/main/logo-partner.png"
          })`,
        }}
      ></div>
      <div className={s.clientinfo__box}>
        {types.length > 0 ? (
          types.map((el, index) => (
            <p key={index} className={s.clientinfo__type}>{el.title}</p>
          ))
        ) : (
          ""
        )}
        <h1 className={s.clientinfo__name}>{name}</h1>
        {openingTime && closingTime ? (
          <div className={s.clientinfo__worktime}>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="clock-time-eight-outline">
                <path
                  id="Vector"
                  d="M8.50016 13.3333C11.4335 13.3333 13.8335 10.9333 13.8335 8.00001C13.8335 5.06668 11.4335 2.66668 8.50016 2.66668C5.56683 2.66668 3.16683 5.06668 3.16683 8.00001C3.16683 10.9333 5.56683 13.3333 8.50016 13.3333ZM8.50016 1.33334C12.1668 1.33334 15.1668 4.33334 15.1668 8.00001C15.1668 11.6667 12.1668 14.6667 8.50016 14.6667C4.8335 14.6667 1.8335 11.6667 1.8335 8.00001C1.8335 4.33334 4.8335 1.33334 8.50016 1.33334ZM8.8335 8.53334L5.6335 10.4L5.16683 9.46668L7.8335 7.93334V4.66668H8.8335V8.53334Z"
                  fill="black"
                />
              </g>
            </svg>
            <span>
              {openingTime} - {closingTime}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ClientInfo;
