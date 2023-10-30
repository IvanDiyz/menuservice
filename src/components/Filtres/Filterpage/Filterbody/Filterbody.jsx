import s from "./Filterbody.module.scss";
import Checkbox from "@/components/Filtres/Filterpage/Checkbox/Checkbox";

export default function Filterbody() {
  return (
    <div className={s.filter}>
      <Checkbox id={'alergen'} name={'Алергени'}/>
      <Checkbox id={'vegan'} name={'Вегетаріанське'}/>
      <Checkbox id={'spicy'} name={'Гостре'}/>
    </div>
  );
}
