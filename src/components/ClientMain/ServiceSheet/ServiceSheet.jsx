"use client";
// Styles
import LinkMenu from "@/components/ClientMain/ServiceSheet/Link/LinkMenu";
import s from "./ServiceSheet.module.scss";
import { useAppDispatch } from "@/hooks/redux";

const ServiceSheet = ({ menus }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.serviceSheet}>
      {menus.map((el) => (
        <LinkMenu key={el.id} menu={el} />
      ))}
    </div>
  );
};

export default ServiceSheet;
