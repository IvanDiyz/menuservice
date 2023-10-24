import s from "./Search.module.scss";
import Searchheader from "./Searchheader/Searchheader";
import Searchbody from "./Searchbody/Searchbody";

export default function Search({changState}) {
  return (
    <>
      <Searchheader result={'Пошук'} changState={changState}/>
      <Searchbody />
    </>
  );
}
