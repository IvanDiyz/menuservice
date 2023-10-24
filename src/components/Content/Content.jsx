"use client";
import s from "./Content.module.scss";

const Content = ({ children }) => {
  return (
    <section className={s.site}>
      {children}
    </section>
  );
};

export default Content;
