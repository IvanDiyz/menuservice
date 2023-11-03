import s from "./Openedmenu.module.scss";
import Openedinfo from "@/components/Openedmenu/Openedinfo/Openedinfo";
import Openedcontact from "@/components/Openedmenu/Openedcontact/Openedcontact";
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import ServiceSheet from "@/components/ClientMain/ServiceSheet/ServiceSheet";
import { useAppSelector } from "@/hooks/redux";

export default function Openedmenu() {
  const selector = useAppSelector;
  const { menus } = selector(state => state.menu)
  return (
    <div className={s.openedMenu}>
      <Openedinfo />
      <OrderMethods firstmethod={'В закладі'} lastmethod={'Із собою'}/>
      {menus ? <ServiceSheet menus={menus}/> : 'Loading'} 
      <Openedcontact />
    </div>
  );
}
