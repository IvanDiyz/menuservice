"use client"
import s from "./layout.module.scss";
import Basketheader from "@/components/Basket/Basketheader/Basketheader";
import BasketFooter from "@/components/Basket/BasketFooter/BasketFooter";
import { useAppSelector } from "@/hooks/redux";

export default function DashboardLayout({ children }) {
  const selector = useAppSelector;
  const { paymentStatus } = selector(state => state.setBasket);

  return (
    <div className={`${s.main} ${paymentStatus ? `${s.main__paymentBlock}` : ''}`}>
      <div>
        <Basketheader />
        {children}
      </div>
      <BasketFooter />
    </div>
  );
}
