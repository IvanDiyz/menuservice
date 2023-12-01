"use client";
import s from "./Content.module.scss";

const Content = ({ children }) => {
  return (
    <div className={s.site}>
      {children}
    </div>
  );
};

export default Content;
