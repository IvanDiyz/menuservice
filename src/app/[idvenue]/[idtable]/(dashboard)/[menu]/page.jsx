"use client";

//thunk
import { fetchSections } from "@/store/getSections/sectionsApi";

//style
import Filtres from "@/components/Filtres/Filtres";
import Menuitems from "@/components/Menuitems/Menuitems";
import Totalscore from "@/components/Totalscore/Totalscore";
import Notificate from "@/components/Notificate/Notificate";
import Container from "@/components/Container/Container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { setMenuId } from "@/store/getSections/getSections";
import { managerItems } from "@/store/setOrder/setOrder";
import Search from "@/components/Search/Search";

const menu = ({params}) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { menuId, error } = selector((state) => state.getSections);
  const { amount, items } = selector((state) => state.setOrder);
  const [search, setSearch] = useState(false);

  const changSearch = () => {
    !search ? setSearch(true) : setSearch(false);
  };
  

  useEffect(() => {
    if(menuId == null) {
      const id = localStorage.getItem("menuId");
      const name = localStorage.getItem("menuName");
      dispatch(setMenuId({id, name}))
      return
    }
    //pregnant all sections by api
    const fetchData = async () => {
      await dispatch(fetchSections(menuId));
      //set the value to true to stop loading
      setDataLoaded(true);
    };
    fetchData();
  }, [menuId]);

 

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem('items'))
    const localAmount = JSON.parse(localStorage.getItem('amount'))
    if(localItems !== null && localAmount !== null) {
      dispatch(managerItems({items: localItems, amount: localAmount}))
    }
  }, [])

  if (!dataLoaded || error != '') {
    return <Container>{error && error}</Container>;
  } else {
    return (
      <>
        {/* <Search changState={changSearch} params={params} /> */}
        <Filtres />
        <Menuitems />
        <Totalscore />
        <Notificate />
      </>
    );
  }
};

export default menu;
