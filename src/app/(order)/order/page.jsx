import OrderMethods from "@/components/ClientMain/OrderMethods/OrderMethods";
import OrderItems from "@/components/Order/OrderItems/OrderItems";
import Total from "@/components/Total/Total";
import Tips from "@/components/Tips/Tips";
import s from "./page.module.scss";

export default function Order() {
  return (
    <div className={s.order}>
     <OrderMethods firstmethod={'По готовності'} lastmethod={'Все разом'} svg={false}/>
     <OrderItems />
     <Total total={905}/>
     <Tips tips={true}/>
    </div>
  );
}
