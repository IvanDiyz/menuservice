"use client";
import s from "./Layer.module.scss";

// Components
import Header from "../Header/Header";
import Content from "../Content/Content";

const Layer = ({ children }) => {
  return (
    <>

      <div className={s.container}>
        <Header />
        <Content children={children} />
      </div>
    </>
  );
};

export default Layer;
