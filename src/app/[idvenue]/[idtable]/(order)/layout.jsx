'use client'
import s from "./layout.module.scss";
import Orderheader from "@/components/Order/Orderheader/Orderheader";
import OrderFooter from "@/components/Order/OrderFooter/OrderFooter";
import { useAppSelector } from "@/hooks/redux";
import Loading from "@/components/Loading/Loading"
import Pageresult from "@/components/Pageresult/Pageresult"

export default function DashboardLayout({ children }) {
  const selector = useAppSelector;
  const { delivery, status, items } = selector((store) => store.setOrder);

  const objWaiting = {
    loading:  <Loading loading={status}/>,
    succeeded: <Pageresult answer={'thankOrder'}/>,
    failed: <Pageresult answer={'notResponding'}/>,
  }

  if (status) {
    return (
      objWaiting[status]
    )
  } else {
    return (
      <div className={s.main}>
        <div>
          <Orderheader />
          {children}
        </div>
        {items.length > 0 && <OrderFooter />}
      </div>
    );
  }
}
