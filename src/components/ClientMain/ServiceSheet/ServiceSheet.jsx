"use client";
// Styles
import Link from "next/link";
import s from "./ServiceSheet.module.scss";
import { useAppDispatch } from "@/hooks/redux";
import { setMenuId } from "@/store/getSections/getSections";

const ServiceSheet = ({ menus }) => {
  const dispatch = useAppDispatch();

  //function set by id menu
  const menuId = async (id, name) => {
    dispatch(setMenuId({id, name}));
  };

  return (
    <div className={s.serviceSheet}>
      {menus.map((el) => {
        return (
          <Link href={`/${el.name.replace(/\s/g, '')}${el.id}`} key={el.id} onClick={() => menuId(el.id, el.name)}>
            <div className={s.serviceSheet__box}>
              <div className={s.serviceSheet__nameService}>
                <p className={s.serviceSheet__name}>{el.name}</p>
                <span className={s.serviceSheet__timeService}>
                  9:00 - 22:00
                </span>
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
        );
      })}
    </div>
  );
};

export default ServiceSheet;
