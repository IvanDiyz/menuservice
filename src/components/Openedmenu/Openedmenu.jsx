import s from "./Openedmenu.module.scss";
import Openedinfo from "@/components/Openedmenu/OpenedInfo/OpenedInfo";
import Openedcontact from "@/components/Openedmenu/Openedcontact/Openedcontact";
import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import ServiceSheet from "@/components/ClientMain/ServiceSheet/ServiceSheet";
import { useAppSelector } from "@/hooks/redux";

export default function Openedmenu() {
  const selector = useAppSelector;
  const { menus, name } = selector(state => state.menu)
  return (
    <div className={s.openedMenu}>
      <Openedinfo name={name}/>
      <OrderMethods firstmethod={'В закладі'} lastmethod={'Із собою'}/>
      {menus ? <ServiceSheet menus={menus}/> : 'Loading'}
      <Openedcontact />
    </div>
  );
}
