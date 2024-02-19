"use client";
import { useState } from "react";
import s from "./Header.module.scss";
import Openedmenu from "../Openedmenu/Openedmenu";
import Search from "@/components/Search/Search";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setNotificate } from "@/store/notificate/notificate";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({params}) {
  const selector = useAppSelector;
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { venueId, tableId, logoUrl } = selector((state) => state.menu);
  const { orderId } = selector((state) => state.setBasket);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);

  const changSearch = () => {
    !search ? setSearch(true) : setSearch(false);
    setMenu(false);
  };
  const changMenu = () => {
    !menu ? setMenu(true) : setMenu(false);
    setSearch(false);
  };
  //function for open Notificate
  const openNotificate = () => {
    dispatch(setNotificate(true));
  };

  return (
    <header className={s.header}>
      <div className={s.header__burgerBox}>
        {pathName !== `/${venueId}/${tableId}` ? (
        <Link className={s.header__homeLink} href={`/${venueId}/${tableId}`}>
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
      </div>
      <div className={s.header__wrapper}>
        <Link href={`/${venueId}/${tableId}`}>
          {pathName == `/${venueId}/${tableId}` ? (
            <svg
              width="69"
              height="48"
              viewBox="0 0 69 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.78525 37.9428C7.25192 37.9428 6.81646 37.5057 6.81646 36.9715C6.81646 36.4371 7.25192 36 7.78525 36H14.4328C14.0934 36.5829 13.9092 37.2531 13.9092 37.9428H7.78525ZM13.9092 42.8H5.42252C4.88918 42.8 4.45373 42.3629 4.45373 41.8286C4.45373 41.2943 4.88918 40.8571 5.42252 40.8571H13.9092V42.8ZM3.05979 47.6571C2.52452 47.6571 2.091 47.22 2.091 46.6857C2.091 46.1514 2.52452 45.7143 3.05979 45.7143H13.9092C13.9092 46.404 14.0934 47.0743 14.4328 47.6571H3.05979ZM29.4243 36H17.7879C16.7116 36 15.8486 36.8645 15.8486 37.9428V45.7143C15.8486 46.7926 16.7116 47.6571 17.7879 47.6571H29.4243C30.5007 47.6571 31.3637 46.7926 31.3637 45.7143V37.9428C31.3637 36.8645 30.5007 36 29.4243 36ZM29.4243 37.9428V39.4286H17.7879V37.9428H29.4243ZM17.7879 45.7143V41.4857H29.4243V45.7143H17.7879Z"
                fill="#2EB955"
              />
              <path
                d="M35.9505 48V35.5325H40.9501C41.9112 35.5325 42.73 35.7131 43.4065 36.0743C44.083 36.4314 44.5986 36.9286 44.9534 37.5658C45.3123 38.1989 45.4917 38.9294 45.4917 39.7573C45.4917 40.5853 45.3102 41.3157 44.9472 41.9489C44.5842 42.582 44.0583 43.0751 43.3694 43.4282C42.6846 43.7813 41.8555 43.9578 40.882 43.9578H37.6954V41.8454H40.4488C40.9645 41.8454 41.3894 41.7582 41.7235 41.5837C42.0617 41.405 42.3133 41.1595 42.4784 40.847C42.6475 40.5305 42.7321 40.1672 42.7321 39.7573C42.7321 39.3434 42.6475 38.9822 42.4784 38.6737C42.3133 38.3612 42.0617 38.1198 41.7235 37.9493C41.3853 37.7748 40.9562 37.6875 40.4365 37.6875H38.6297V48H35.9505ZM47.9528 48H45.0818L49.4564 35.5325H52.9091L57.2776 48H54.4065L51.2323 38.3815H51.1333L47.9528 48ZM47.7734 43.0994H54.555V45.157H47.7734V43.0994ZM56.767 35.5325H59.768L62.6576 40.9018H62.7814L65.671 35.5325H68.672L64.0499 43.5925V48H61.3892V43.5925L56.767 35.5325Z"
                fill="black"
              />
              <path
                d="M10.4698 20.4796C10.4005 19.7921 10.1031 19.258 9.57754 18.8774C9.05196 18.4967 8.33875 18.3063 7.43785 18.3063C6.8257 18.3063 6.30882 18.3916 5.88724 18.562C5.46567 18.7268 5.14226 18.9569 4.91703 19.2523C4.69758 19.5478 4.58785 19.8831 4.58785 20.2581C4.5763 20.5706 4.64271 20.8433 4.78709 21.0763C4.93724 21.3092 5.14226 21.5109 5.40214 21.6814C5.66202 21.8461 5.96232 21.991 6.30305 22.116C6.64378 22.2353 7.00761 22.3376 7.39456 22.4228L8.98846 22.7978C9.76231 22.9683 10.4727 23.1955 11.1194 23.4796C11.7663 23.7637 12.3265 24.1132 12.8 24.528C13.2736 24.9427 13.6403 25.4314 13.9001 25.9939C14.1658 26.5564 14.3015 27.2012 14.3073 27.9285C14.3015 28.9967 14.0243 29.9228 13.4757 30.7069C12.9328 31.4853 12.1474 32.0904 11.1194 32.5223C10.0973 32.9484 8.86426 33.1614 7.42056 33.1614C5.98831 33.1614 4.74089 32.9456 3.67827 32.5137C2.62144 32.0819 1.7956 31.4427 1.20077 30.5961C0.611708 29.7438 0.30274 28.6899 0.273865 27.4342H3.90351C3.94393 28.0194 4.1143 28.508 4.4146 28.9001C4.72067 29.2865 5.12782 29.5791 5.63603 29.7779C6.15001 29.9712 6.73041 30.0677 7.37721 30.0677C8.0125 30.0677 8.56401 29.9768 9.03174 29.795C9.50534 29.6131 9.87208 29.3603 10.1319 29.0365C10.3918 28.7126 10.5217 28.3405 10.5217 27.92C10.5217 27.528 10.4034 27.1984 10.1666 26.9314C9.93558 26.6643 9.59483 26.4371 9.14438 26.2495C8.69971 26.062 8.15398 25.8916 7.50712 25.7382L5.57539 25.2609C4.07964 24.903 2.89864 24.3433 2.03238 23.5819C1.16611 22.8205 0.735869 21.795 0.741646 20.5052C0.735869 19.4484 1.02174 18.5251 1.59925 17.7353C2.18253 16.9455 2.98238 16.3291 3.99879 15.8859C5.01521 15.4427 6.17023 15.2211 7.46384 15.2211C8.78056 15.2211 9.92979 15.4427 10.9115 15.8859C11.8991 16.3291 12.6672 16.9455 13.2158 17.7353C13.7644 18.5251 14.0474 19.4399 14.0648 20.4796H10.4698ZM32.4837 21.5705H28.6894C28.6201 21.0876 28.4787 20.6586 28.265 20.2837C28.0513 19.903 27.777 19.5791 27.442 19.3121C27.107 19.045 26.7201 18.8404 26.2812 18.6984C25.8481 18.5563 25.3774 18.4853 24.8692 18.4853C23.9509 18.4853 23.1511 18.7097 22.4697 19.1586C21.7882 19.6018 21.2598 20.2495 20.8844 21.1018C20.509 21.9484 20.3213 22.9768 20.3213 24.187C20.3213 25.4314 20.509 26.4768 20.8844 27.3234C21.2656 28.17 21.7969 28.8092 22.4783 29.241C23.1598 29.6728 23.9481 29.8887 24.8432 29.8887C25.3456 29.8887 25.8105 29.8234 26.2379 29.6927C26.671 29.5621 27.0551 29.3717 27.3901 29.1217C27.725 28.866 28.0022 28.5563 28.2216 28.1927C28.4469 27.8291 28.6028 27.4143 28.6894 26.9484L32.4837 26.9655C32.3855 27.7666 32.1401 28.5393 31.7473 29.2837C31.3604 30.0222 30.8378 30.6842 30.1794 31.2694C29.5268 31.849 28.7472 32.3092 27.8405 32.6501C26.9395 32.9854 25.9203 33.1529 24.7826 33.1529C23.2002 33.1529 21.7853 32.8007 20.5379 32.0961C19.2962 31.3916 18.3145 30.3717 17.5926 29.0365C16.8765 27.7012 16.5185 26.0847 16.5185 24.187C16.5185 22.2836 16.8823 20.6643 17.6099 19.3291C18.3376 17.9939 19.3252 16.9768 20.5725 16.2779C21.82 15.5734 23.2233 15.2211 24.7826 15.2211C25.8105 15.2211 26.7634 15.3632 27.6413 15.6473C28.5248 15.9314 29.3074 16.3462 29.9888 16.8916C30.6703 17.4314 31.2247 18.0933 31.652 18.8774C32.0852 19.6614 32.3624 20.5592 32.4837 21.5705ZM37.8978 32.9143H33.8784L40.0028 15.4598H44.8365L50.9524 32.9143H46.9329L42.489 19.4484H42.3504L37.8978 32.9143ZM37.6466 26.0535H47.1408V28.9342H37.6466V26.0535ZM67.9268 15.4598V32.9143H64.6869L56.9686 21.9285H56.8386V32.9143H53.0877V15.4598H56.3795L64.0372 26.4371H64.1932V15.4598H67.9268Z"
                fill="black"
              />
              <path
                d="M0.405762 12.3429V-0.124664H8.94465V2.04863H3.08499V5.01941H8.50528V7.19267H3.08499V10.1696H8.96939V12.3429H0.405762ZM13.259 12.3429H10.3879L14.7625 -0.124664H18.2152L22.5836 12.3429H19.7125L16.5383 2.72436H16.4394L13.259 12.3429ZM13.0795 7.44227H19.8611V9.4999H13.0795V7.44227ZM22.0778 2.04863V-0.124664H32.4853V2.04863H28.6057V12.3429H25.9574V2.04863H22.0778Z"
                fill="black"
              />
              <path
                d="M66.2507 4.40415C67.1115 4.40094 67.8099 5.08853 67.8061 5.93536C67.8023 6.78658 67.1021 7.47588 66.2369 7.48013L50.0258 7.56043L50.0016 8.01835C50.0051 9.70795 48.6029 11.0875 46.8744 11.095L37.2237 11.1696L37.2217 9.153L44.4236 9.09993L44.4108 7.02887L37.2199 7.07097L37.2289 5.06518L44.4197 5.04487L44.4511 2.9736L37.2382 2.994L37.2695 0.966322L46.9198 0.957154C48.6483 0.949652 50.0382 2.31712 50.0195 4.00681L50.0397 4.46455L66.2507 4.40415Z"
                fill="#2EB955"
              />
            </svg>
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
        <Link href={`/${venueId}/${tableId}/basket`}>
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
      <div
        className={`${s.header__search} ${
          search ? `${s.header__searchOpen}` : ""
        }`}
      >
        <Search changState={changSearch} params={params} />
      </div>
      <div
        className={`${s.header__menu} ${menu ? `${s.header__menuhOpen}` : ""}`}
      >
        <Openedmenu changState={changMenu} />
      </div>
    </header>
  );
}
