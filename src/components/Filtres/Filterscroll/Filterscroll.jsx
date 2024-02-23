"use client";
import Link from "next/link";

import s from "./Filterscroll.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { fetchDishis } from "@/store/getDishis/getDishisApi";
import { setActualSection } from "@/store/getDishis/getDishis";
import { clearDishis, setCurrentPage } from "../../../store/getDishis/getDishis";

export default function Filterscroll() {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { sections, menuId } = selector((state) => state.getSections);
  const { currentPage, dishis, actualSection } = selector((state) => state.getDishis);
  const [selectedSection, setSelectedSection] = useState(actualSection || null);

  useEffect(() => {
    const fetchData = async () => {
      if(selectedSection == null) {
        if(currentPage !== dishis.currentPage) {
          await dispatch(fetchDishis({selectedSection, menuId, currentPage}));
          dispatch(setActualSection(null))
        }
      }else {
        dispatch(setCurrentPage(1))
        dispatch(setActualSection(selectedSection))
        await dispatch(fetchDishis({selectedSection, menuId, currentPage}));
      }
    };
    fetchData();
  }, [selectedSection, currentPage])

  //change the state of the section
  const handleItemClick = (id) => {
    if(id == selectedSection) {
      dispatch(clearDishis())
      dispatch(setCurrentPage(1))
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
