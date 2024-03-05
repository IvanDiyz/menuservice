"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import s from "./Searchbody.module.scss";
import { createRef, useEffect } from "react";
import { changeValue } from "@/store/setSearch/setSearch";
import { fetchSearch } from "@/store/setSearch/setSearchApi";
import Menuitem from "@/components/Menuitems/Menuitem/Menuitem";

export default function Searchbody({params}) {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const { searchValue, dishis, idMenu } = selector((state) => state.setSearch);
  const { actualSection } = selector((state) => state.getDishis);

  useEffect(() => {
    if (searchValue) {
      if(actualSection || idMenu) {
        dispatch(fetchSearch({ idMenu, actualSection, searchValue, venueUId: params.idvenue }));
      } else {
        dispatch(fetchSearch({ searchValue, venueUId: params.idvenue  }));
      }
    }
  }, [searchValue]);



  return (
    <div className={`${s.search} ${dishis.length > 0 ? `${s.search__find}` : ''}`}>
      {
        searchValue ?
        dishis.map((el) => (
          <Menuitem triger={0} dish={el} key={el.id} />
        )) : ""
      }
    </div>
  );
}
