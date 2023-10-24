import s from "./OrderItems.module.scss";
import OrderItem from "@/components/Order/OrderItems/OrderItem/OrderItem";


export default function OrderItems() {
  return (
    <div className={s.orderItems}>
      <OrderItem />
      <OrderItem />
    </div>
  );
}
