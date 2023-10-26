"use client";
import Link from "next/link";

import s from "./Filterscroll.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { fetchDishis } from "@/store/getDishis/getDishisApi";

export default function Filterscroll() {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { sections, menuId } = selector((state) => state.getSections);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if(selectedSection == null) {
        await dispatch(fetchDishis({selectedSection, menuId}));
      }else {
        await dispatch(fetchDishis({selectedSection, menuId}));
      }
    };
    fetchData();
  }, [selectedSection])

  //change the state of the section
  const handleItemClick = (id) => {
    if(id == selectedSection) {
      setSelectedSection(null);
    }else {
      setSelectedSection(id);
    }
  };

  return (
    <ul className={s.filterscroll}>
      {sections.map((el) => (
        <li
          className={`${s.filterscroll__item} ${
            selectedSection === el.id ? s.active : ""
          }`}
          key={el.id}
          onClick={() => handleItemClick(el.id)}
        >
          {el.name}
        </li>
      ))}
    </ul>
  );
}
