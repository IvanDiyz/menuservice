"use client";
// Styles
import Link from "next/link";
import s from "./LinkMenu.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setMenuId } from "@/store/getSections/getSections";
import { useEffect, useState } from "react";
import { setSearchMenu } from "@/store/setSearch/setSearch";

const LinkMenu = ({ menu }) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { venueId, tableId } = selector((state) => state.menu);
  const [startTime, setStartTime] = useState(false);
  const [finishTime, setFinishTime] = useState(false);
  const [actualTime, setactualTime] = useState();
  const [click, chekedClick] = useState(false);
  const { id, name } = menu;
  let setTime = (time, methodTime) => {
    const formattedTime = +time.replace(":", "");
    methodTime(formattedTime);
  };
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setactualTime(+`${hours}${minutes}`);
  }
  useEffect(() => {
    getCurrentTime();
    if (menu.startTime && menu.finishTime) {
      setTime(menu.startTime, setStartTime);
      setTime(menu.finishTime, setFinishTime);
    }
  }, [menu.startTime, menu.finishTime]);

  useEffect(() => {
    if (click) {
      localStorage.setItem("menuId", id);
      localStorage.setItem("menuName", name);
      dispatch(setMenuId({ id, name }));
      dispatch(setSearchMenu(id));
      chekedClick(false);
    }
  }, [click]);

  //function set by id menu
  const menuId = (id, name) => {
    chekedClick(true);
  };

  return (
    <>
      {startTime && finishTime ? (
        <Link
          className={`${
            actualTime >= startTime && actualTime < finishTime
              ? `${s.menuWork}`
              : `${s.menuNoWork}`
          }`}
          href={`/${venueId}/${tableId}/${menu.name.replace(/\s/g, "")}${
            menu.id
          }`}
          onClick={() => menuId(menu.id, menu.name)}
        >
          <div className={s.serviceSheet__box}>
            <div className={s.serviceSheet__nameService}>
              <p className={s.serviceSheet__name}>{menu.name}</p>
              {menu.startTime && menu.finishTime ? (
                <span className={s.serviceSheet__timeService}>
                  {menu.startTime} - {menu.finishTime}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={s.serviceSheet__row}>
              {actualTime >= startTime && actualTime < finishTime ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="chevron-right">
                    <path
                      id="Vector"
                      d="M8.59009 16.58L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.58Z"
                      fill="#27257A"
                    />
                  </g>
                </svg>
              ) : (
                ""
              )}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          className={s.menuWork}
          href={`/${venueId}/${tableId}/${menu.name.replace(/\s/g, "")}${
            menu.id
          }`}
          onClick={() => menuId(menu.id, menu.name)}
        >
          <div className={s.serviceSheet__box}>
            <div className={s.serviceSheet__nameService}>
              <p className={s.serviceSheet__name}>{menu.name}</p>
              {menu.startTime && menu.finishTime ? (
                <span className={s.serviceSheet__timeService}>
                  {menu.startTime} - {menu.finishTime}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={s.serviceSheet__row}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="chevron-right">
                  <path
                    id="Vector"
                    d="M8.59009 16.58L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.58Z"
                    fill="#27257A"
                  />
                </g>
              </svg>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default LinkMenu;
