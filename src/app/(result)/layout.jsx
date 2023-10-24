import s from "./layout.module.scss";
import Orderheader from "@/components/Order/Orderheader/Orderheader";
import OrderFooter from "@/components/Order/OrderFooter/OrderFooter";

export default function DashboardLayout({ children }) {
  return (
    <main className={s.main}>
        {children}
    </main>
  );
}
