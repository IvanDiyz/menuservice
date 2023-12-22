"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";


// Components
import Container from "../Container/Container";
import ClientInfo from "./ClientInfo/ClientInfo";
import OrderMethods from "./OrderMethods/OrderMethods";
import ServiceSheet from "./ServiceSheet/ServiceSheet";

// Styles
import s from "./ClientMain.module.scss";
import Openedcontact from "../Openedmenu/Openedcontact/Openedcontact";
import { setMethodOrder } from "@/store/menu/menuSlice";
import { clearDishis } from "@/store/getDishis/getDishis";

const ClientMain = ({params}) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {photoUrl, venueId, menus, address, extraPhone, phone, website, instagram, facebook, name, openingTime, closingTime, types, logoUrl, methodOrder} = selector((state)=> state.menu);

  useEffect(() => {
      const venueIdLocal = localStorage.getItem("venueId");
      const tableIdLocal = localStorage.getItem("tableId");
      if (params.idtable !== tableIdLocal || params.idvenue !== venueIdLocal) {
        localStorage.removeItem("paymentStatus");
        localStorage.removeItem("orders");
        localStorage.removeItem("tableId");
        localStorage.removeItem("venueId");
      }
    dispatch(clearDishis())
    localStorage.setItem("venueId", params.idvenue);
    localStorage.setItem("tableId", params.idtable);
  }, [])

  useEffect(() => {   
    if(venueId !== null) {
      setDataLoaded(true)
    }
  }, [venueId])

  if (!dataLoaded) {
    return <Container>Loading...</Container>;
  }else {
    return (
      <Container>
        <ClientInfo photoUrl={photoUrl} name={name} logoUrl={logoUrl} openingTime={openingTime} closingTime={closingTime} types={types}/>
        <OrderMethods keySlice={methodOrder} firstDescription={false} lastDescription={true} dispatchMethod={setMethodOrder} firstmethod={'В закладі'} lastmethod={'Із собою'} svg={true}/>
        <ServiceSheet menus={menus}/>
        <Openedcontact address={address} extraPhone={extraPhone} phone={phone} website={website} instagram={instagram} facebook={facebook}/>
      </Container>
    );
  }
};

export default ClientMain;
