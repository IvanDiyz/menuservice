"use client";
import s from "./Layer.module.scss";

// Components
import Header from "../Header/Header";
import Content from "../Content/Content";

const Layer = ({ children, params }) => {
  return (
    <>

      <div className={s.container}>
        <Header params={params} />
        <Content children={children} />
      </div>
    </>
  );
};

export default Layer;
