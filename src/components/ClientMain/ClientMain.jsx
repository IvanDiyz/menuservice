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
import Openedcontact from "../Openedmenu/Openedcontact/Openedcontact";
import { setMethodOrder } from "@/store/menu/menuSlice";

const ClientMain = (params) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {photoUrl, venueId, menus, address, extraPhone, phone, website, instagram, facebook, name, openingTime, closingTime, types, logoUrl, methodOrder} = selector((state)=> state.menu);

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
        <ClientInfo photoUrl={photoUrl} name={name} logoUrl={logoUrl} openingTime={openingTime} closingTime={closingTime} types={types}/>
        <OrderMethods keySlice={methodOrder} firstDescription={false} lastDescription={true} dispatchMethod={setMethodOrder} firstmethod={'В закладі'} lastmethod={'Із собою'} svg={true}/>
        <ServiceSheet menus={menus}/>
        <Openedcontact address={address} extraPhone={extraPhone} phone={phone} website={website} instagram={instagram} facebook={facebook}/>
      </Container>
    );
  }
};

export default ClientMain;
