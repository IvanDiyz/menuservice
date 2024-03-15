"use client";
import { useState } from "react";
import s from "./Header.module.scss";
import Search from "@/components/Search/Search";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setNotificate } from "@/store/notificate/notificate";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setOpenedSearch } from "@/store/setSearch/setSearch";

export default function Header({params}) {
  const selector = useAppSelector;
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { venueId, tableUId, logoUrl, licenseType } = selector((state) => state.menu);
  const { orderId } = selector((state) => state.setBasket);
  const [search, setSearch] = useState(false);

  const changSearch = () => {
    if(!search) {
      setSearch(true)
      dispatch(setOpenedSearch(true))
    } else {
      setSearch(false)
      dispatch(setOpenedSearch(false))
    }
    !search ? setSearch(true) : setSearch(false);
  };
  //function for open Notificate
  const openNotificate = () => {
    dispatch(setNotificate(true));
  };

  return (
    <header className={s.header}>
      <div className={s.header__burgerBox}>
        {pathName !== `/${venueId}/${tableUId}` ? (
        <Link className={s.header__homeLink} href={`/${venueId}/${tableUId}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="home">
              <path
                id="Vector"
                d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
                fill="black"
              />
            </g>
          </svg>
        </Link>
        ) : '' }
        {licenseType?.isBotOn && (
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={openNotificate}
            >
              <path
                d="M19.3636 16.7619V17.5714H4.63636V16.7619L6.27273 15.1429V10.2857C6.27273 7.77619 7.93364 5.56619 10.3636 4.85381C10.3636 4.77286 10.3636 4.7 10.3636 4.61905C10.3636 4.18965 10.536 3.77784 10.8429 3.47421C11.1498 3.17058 11.566 3 12 3C12.434 3 12.8502 3.17058 13.1571 3.47421C13.464 3.77784 13.6364 4.18965 13.6364 4.61905C13.6364 4.7 13.6364 4.77286 13.6364 4.85381C16.0664 5.56619 17.7273 7.77619 17.7273 10.2857V15.1429L19.3636 16.7619ZM13.6364 18.381C13.6364 18.8104 13.464 19.2222 13.1571 19.5258C12.8502 19.8294 12.434 20 12 20C11.566 20 11.1498 19.8294 10.8429 19.5258C10.536 19.2222 10.3636 18.8104 10.3636 18.381M18.3409 3.96333L17.1791 5.11286C18.5782 6.48095 19.3636 8.34286 19.3636 10.2857H21C21 7.91381 20.0509 5.63095 18.3409 3.96333ZM3 10.2857H4.63636C4.63636 8.34286 5.42182 6.48095 6.82091 5.11286L5.65909 3.96333C3.94909 5.63095 3 7.91381 3 10.2857Z"
                fill="black"
              />
            </svg>
          </span>
        )}
      </div>
      <div className={s.header__wrapper}>
        <Link href={`/${venueId}/${tableUId}`}>
          {pathName == `/${venueId}/${tableUId}` ? (
            ''
          ) : (
            <div
              className={s.header__logo}
              style={{
                backgroundImage: `url(${
                  logoUrl ? logoUrl : "" 
                })`,
              }}
            ></div>
          )}
        </Link>
      </div>
      <div className={s.header__wrapper}>
        {licenseType?.isOrderOn ? (
          <Link href={`/${venueId}/${tableUId}/basket`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame 83">
                <g id="Group">
                  <path
                    id="Vector"
                    d="M3.76514 3C3.34257 3 3 3.34257 3 3.76514C3 4.18772 3.34257 4.53029 3.76514 4.53029H4.14114C4.48276 4.53029 4.78299 4.75676 4.87684 5.08523L7.3032 13.5775C7.58475 14.5629 8.48544 15.2423 9.51031 15.2423H16.5017C17.4403 15.2423 18.2844 14.6709 18.633 13.7994L20.8891 8.1592C21.2911 7.15402 20.5507 6.06058 19.4682 6.06058H6.74703L6.34824 4.66483C6.0667 3.6794 5.166 3 4.14114 3H3.76514Z"
                    fill={orderId ? "#2EB955" : "black"}
                  />
                  <path
                    id="Vector_2"
                    d="M8.88631 21.0009C10.1541 21.0009 11.1817 19.9731 11.1817 18.7054C11.1817 17.4377 10.1541 16.41 8.88631 16.41C7.61858 16.41 6.59088 17.4377 6.59088 18.7054C6.59088 19.9731 7.61858 21.0009 8.88631 21.0009Z"
                    fill={orderId ? "#2EB955" : "black"}
                  />
                  <path
                    id="Vector_3"
                    d="M17.0075 21.0009C18.2752 21.0009 19.3029 19.9731 19.3029 18.7054C19.3029 17.4377 18.2752 16.41 17.0075 16.41C15.7397 16.41 14.712 17.4377 14.712 18.7054C14.712 19.9731 15.7397 21.0009 17.0075 21.0009Z"
                    fill={orderId ? "#2EB955" : "black"}
                  />
                </g>
              </g>
            </svg>
          </Link>
        ): <span></span>}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={changSearch}
          >
            <g id="magnify">
              <path
                id="Vector"
                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                fill="black"
              />
            </g>
          </svg>
      </div>
      {search && (
      <div
        className={`${s.header__search} ${
          search ? `${s.header__searchOpen}` : ""
        }`}
      >
        <Search changState={changSearch} params={params} />
      </div>
      )}
    </header>
  );
}
