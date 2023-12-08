"use client";
// Styles
import LinkMenu from "@/components/ClientMain/ServiceSheet/Link/LinkMenu";
import s from "./ServiceSheet.module.scss";
import { useAppDispatch } from "@/hooks/redux";

const ServiceSheet = ({ menus }) => {

  return (
    <div className={s.serviceSheet}>
      {menus.map((el, index) => (
        <LinkMenu key={index} menu={el} />
      ))}
    </div>
  );
};

export default ServiceSheet;
