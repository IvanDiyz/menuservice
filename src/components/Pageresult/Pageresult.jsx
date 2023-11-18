import s from "./Pageresult.module.scss";
import Resultheader from "@/components/Pageresult/Resultheader/Resultheader";
import Resultbody from "@/components/Pageresult/Resultbody/Resultbody";
export default function Pageresult({ answer }) {

  const objResults = {
    mainUrl: {
      header: 'Головна сторінка',
      text: 'Ви не обрали заклад, зверніться до адміністратора',
      svg: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.6665 31H26.3332V35.6667H21.6665V31ZM21.6665 12.3333H26.3332V26.3333H21.6665V12.3333ZM23.9998 0.666664C11.0965 0.666664 0.666504 11.1667 0.666504 24C0.666504 30.1884 3.12483 36.1233 7.50068 40.4992C9.66738 42.6659 12.2396 44.3846 15.0706 45.5572C17.9015 46.7298 20.9357 47.3333 23.9998 47.3333C30.1882 47.3333 36.1231 44.875 40.499 40.4992C44.8748 36.1233 47.3332 30.1884 47.3332 24C47.3332 20.9358 46.7296 17.9016 45.557 15.0707C44.3844 12.2398 42.6657 9.66754 40.499 7.50084C38.3323 5.33414 35.7601 3.61542 32.9291 2.44281C30.0982 1.2702 27.064 0.666664 23.9998 0.666664ZM23.9998 42.6667C19.0491 42.6667 14.3012 40.7 10.8005 37.1993C7.29983 33.6986 5.33317 28.9507 5.33317 24C5.33317 19.0493 7.29983 14.3014 10.8005 10.8007C14.3012 7.29999 19.0491 5.33333 23.9998 5.33333C28.9505 5.33333 33.6985 7.29999 37.1992 10.8007C40.6998 14.3014 42.6665 19.0493 42.6665 24C42.6665 28.9507 40.6998 33.6986 37.1992 37.1993C33.6985 40.7 28.9505 42.6667 23.9998 42.6667Z" fill="#FFB800"/>
      </svg>,
    },
    successfullyPay: {
      header: 'Оплата',
      title: 'Дякуємо',
      text: 'Ваш платіж успішно зараховано',
      svg: <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="check-decagram"><path id="Vector" d="M53.6667 28L47.9734 21.5133L48.7667 12.9267L40.3434 11.0133L35.9334 3.59332L28 6.99999L20.0667 3.59332L15.6567 11.0133L7.23337 12.9033L8.02671 21.49L2.33337 28L8.02671 34.4867L7.23337 43.0967L15.6567 45.01L20.0667 52.43L28 49L35.9334 52.4067L40.3434 44.9867L48.7667 43.0733L47.9734 34.4867L53.6667 28ZM23.3334 39.6667L14 30.3333L17.29 27.0433L23.3334 33.0633L38.71 17.6867L42 21L23.3334 39.6667Z" fill="#19A047"/></g>
      </svg>,
    },
    errorPay: {
      header: 'Помилка',
      title: 'Немає підключення',
      text: 'Інтернет зʼєднання відсутнє. Спробуйте підключитися до іншої мережі',
      svg: <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.9998 28C23.2631 28 18.8998 29.5633 15.3998 32.2L11.1998 26.6C15.8898 23.0767 21.6998 21 27.9998 21C34.2998 21 40.1098 23.0767 44.7998 26.6L41.8131 30.5667C40.9498 30.73 40.0865 30.9633 39.2931 31.29C36.0265 29.1667 32.1531 28 27.9998 28ZM48.9998 21L53.1998 15.4C46.1765 10.1267 37.4498 7 27.9998 7C18.5498 7 9.82314 10.1267 2.7998 15.4L6.9998 21C12.8331 16.6133 20.1131 14 27.9998 14C35.8865 14 43.1665 16.6133 48.9998 21ZM27.9998 35C24.8498 35 21.9331 36.05 19.5998 37.8L27.9998 49L30.4265 45.7567C30.3331 45.29 30.3331 44.8233 30.3331 44.3333C30.3331 41.2067 31.3598 38.3367 33.1098 36.0033C31.4998 35.3733 29.7965 35 27.9998 35ZM49.2798 36.0733L44.3331 41.0433L39.3865 36.0967L36.0965 39.3867L41.0431 44.3333L36.0965 49.28L39.3865 52.5933L44.3331 47.6233L49.2798 52.5933L52.5931 49.28L47.6231 44.3333L52.5931 39.3867L49.2798 36.0733Z" fill="#EB3800"/>
      </svg>,
      btn: 'На головну',
    },
    
  }

  return (
    <section className={s.section}>
      <Resultheader result={objResults[answer].header}/>
      <Resultbody answer={objResults[answer]}/>
    </section>
  );
}
