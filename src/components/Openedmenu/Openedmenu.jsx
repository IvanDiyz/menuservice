import s from "./Openedmenu.module.scss";
import Openedinfo from "@/components/Openedmenu/Openedinfo/Openedinfo";
import Openedcontact from "@/components/Openedmenu/Openedcontact/Openedcontact";
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import ServiceSheet from "@/components/ClientMain/ServiceSheet/ServiceSheet";

export default function Openedmenu() {
  return (
    <div className={s.openedMenu}>
      <Openedinfo />
      <OrderMethods firstmethod={'В закладі'} lastmethod={'Із собою'}/>
      <ServiceSheet />
      <Openedcontact />
    </div>
  );
}
