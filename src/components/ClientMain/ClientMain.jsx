"use client";

// Components
import Container from "../Container/Container";
import ClientInfo from "./ClientInfo/ClientInfo";
import OrderMethods from "./OrderMethods/OrderMethods";
import ServiceSheet from "./ServiceSheet/ServiceSheet";

// Styles
import s from "./ClientMain.module.scss";


const ClientMain = () => {
  
  return (
    <Container>
      <ClientInfo />
      <OrderMethods firstmethod={'В закладі'} lastmethod={'Із собою'}/>
      <ServiceSheet />
    </Container>
  );
};

export default ClientMain;
