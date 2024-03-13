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
import { clearDishis, setCurrentPage } from "@/store/getDishis/getDishis";

const ClientMain = ({params}) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {photoUrl, closingTime, openingTime, venueId, menus, address, extraPhone, phone, website, instagram, facebook, name, types, logoUrl, methodOrder, isDelivery, licenseType, orderMethod, totalOrderMethod, daysWeek} = selector((state)=> state.menu);

  useEffect(() => {
    dispatch(setCurrentPage(1))
    dispatch(clearDishis())
  }, [])

  useEffect(() => {
    if(venueId !== null) {
      setDataLoaded(true)
    }
  }, [venueId])

  const styleMethod = {
    active : {
      paddingLeft: '8vw',
      paddingRight: '8vw',
      columnGap: '8px',
    },
    disable : totalOrderMethod >= 3 ?
      {
        paddingLeft: '6vw',
        paddingRight: '6vw',
      } :
      {
        paddingLeft: '8vw',
        paddingRight: '8vw',
      }
  }

  useEffect(() => {
    localStorage.setItem("methodOrder", methodOrder);
    localStorage.setItem("isDelivery", isDelivery);
  }, [methodOrder])

  if (!dataLoaded) {
    return <Loading text={' '}></Loading>;
  }else {
    return (
      <Container>
        <ClientInfo closingTime={closingTime} openingTime={openingTime} photoUrl={photoUrl} name={name} logoUrl={logoUrl} types={types}/>
        {orderMethod && (
          <OrderMethods
            style={styleMethod}
            firstBtn={licenseType?.isInPlaceOn}
            lastBtn={licenseType?.isToGoOn}
            deliveryProp={licenseType?.isDeliveryOn}
            hide={totalOrderMethod >= 3 ? true : false }
            keySlice={methodOrder}
            deliveryDescription={'delivery'}
            firstDescription={false}
            lastDescription={true}
            dispatchMethod={setMethodOrder}
            deliveryMethod={'Доставка'}
            firstmethod={'В закладі'}
            lastmethod={'Із собою'}
            svg={true}
          />
        )}
        <ServiceSheet menus={menus}/>
        <Openedcontact daysWeek={daysWeek} address={address} extraPhone={extraPhone} phone={phone} website={website} instagram={instagram} facebook={facebook}/>
      </Container>
    );
  }
};

export default ClientMain;
