"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchMenu } from "@/store/menu/menuApi";


// Components
import Container from "../Container/Container";
import ClientInfo from "./ClientInfo/ClientInfo";
import OrderMethods from "./OrderMethods/OrderMethods";
import ServiceSheet from "./ServiceSheet/ServiceSheet";

// Styles
import s from "./ClientMain.module.scss";

const ClientMain = (params) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {venueId, menus, name, openingTime, closingTime, types, logoUrl} = selector((state)=> state.menu);

  useEffect(() => {   
    const fetchData = async () => {
      await dispatch(fetchMenu(params.params));
      setDataLoaded(true);
    };
    fetchData()
  }, [venueId])

  if (!dataLoaded) {
    return <Container>Loading...</Container>;
  }else {
    return (
      <Container>
        <ClientInfo name={name} logoUrl={logoUrl} openingTime={openingTime} closingTime={closingTime} types={types}/>
        <OrderMethods firstmethod={'В закладі'} lastmethod={'Із собою'}/>
        <ServiceSheet menus={menus}/>
      </Container>
    );
  }
};

export default ClientMain;
