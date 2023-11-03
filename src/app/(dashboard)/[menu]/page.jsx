"use client";

//thunk
import { fetchSections } from "@/store/getSections/sectionsApi";

//style
import Filtres from "@/components/Filtres/Filtres";
import Menuitems from "@/components/Menuitems/Menuitems";
import Totalscore from "@/components/Totalscore/Totalscore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";

const menu = () => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { menuId, error } = selector((state) => state.getSections);
  

  useEffect(() => {
    //pregnant all sections by api
    const fetchData = async () => {
      await dispatch(fetchSections(menuId));
      //set the value to true to stop loading
      setDataLoaded(true);
    };
    fetchData();
  }, [menuId]);

  if (!dataLoaded || error != '') {
    return <Container>{error == '' ? 'Loading...' : error}</Container>;
  } else {
    return (
      <>
        <Filtres />
        <Menuitems />
        <Totalscore />
      </>
    );
  }
};

export default menu;
