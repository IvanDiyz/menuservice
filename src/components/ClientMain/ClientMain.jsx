"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";


// Components
import Container from "@/components/Container/Container";
import ClientInfo from "@/components/ClientMain/ClientInfo/ClientInfo";
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import ServiceSheet from "@/components/ClientMain/ServiceSheet/ServiceSheet";
import Openedcontact from "@/components/Openedmenu/Openedcontact/Openedcontact";
import Loading from "@/components/Loading/Loading";

// Styles
import s from "./ClientMain.module.scss";
import { setMethodOrder } from "@/store/menu/menuSlice";
import { clearDishis } from "@/store/getDishis/getDishis";

const ClientMain = ({params}) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {photoUrl, venueId, menus, address, extraPhone, phone, website, instagram, facebook, name, openingTime, closingTime, types, logoUrl, methodOrder} = selector((state)=> state.menu);

  useEffect(() => {
    dispatch(clearDishis())
  }, [])

  useEffect(() => {   
    if(venueId !== null) {
      setDataLoaded(true)
    }
  }, [venueId])

  if (!dataLoaded) {
    return <Loading text={' '}></Loading>;
  }else {
    return (
      <Container>
        <ClientInfo photoUrl={photoUrl} name={name} logoUrl={logoUrl} openingTime={openingTime} closingTime={closingTime} types={types}/>
        <OrderMethods deliveryProp={true} hide={true} keySlice={methodOrder} deliveryDescription={false} firstDescription={false} lastDescription={true} dispatchMethod={setMethodOrder} deliveryMethod={'Доставка'} firstmethod={'В закладі'} lastmethod={'Із собою'} svg={true}/>
        <ServiceSheet menus={menus}/>
        <Openedcontact address={address} extraPhone={extraPhone} phone={phone} website={website} instagram={instagram} facebook={facebook}/>
      </Container>
    );
  }
};

export default ClientMain;
