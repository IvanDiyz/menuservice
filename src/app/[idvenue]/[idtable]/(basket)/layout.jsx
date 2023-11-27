import s from "./layout.module.scss";
import Basketheader from "@/components/Basket/Basketheader/Basketheader";
import BasketFooter from "@/components/Basket/BasketFooter/BasketFooter";

export default function DashboardLayout({ children }) {
  return (
    <main className={s.main}>
      <div>
        <Basketheader />
        {children}
      </div>
      <BasketFooter />
    </main>
  );
}
