import s from "./Pageresult.module.scss";
import Resultheader from "@/components/Pageresult/Resultheader/Resultheader";
import Resultbody from "@/components/Pageresult/Resultbody/Resultbody";
export default function Pageresult({ answer }) {
  return (
    <section className={s.section}>
      {answer ? <Resultheader result={'Оплата'}/> : <Resultheader result={'Помилка'}/>}
      <Resultbody answer={answer}/>
    </section>
  );
}
