import { NextResponse } from "next/server";
import { setBasket } from "./store/setBasket/setBasket";
import { persistor, store } from "./store/store";

export async function middleware(request) {
  // const rehydrated = await setBasket.getInitialState()
  console.log('rehydrated', persistor.getState())
  const orderId = setBasket.getInitialState().orderId;
  const storedOrderId = 'true';
  const currentRoute = request.nextUrl.pathname;
  if(storedOrderId == 'true') {
    try  {
      const response =  await fetch(`http://34.170.34.219:3333/order/${orderId}`)
      // .then(data => {
      //   console.log(data)
      // })
      const data = await response.json();
      // let paymentStatus = await setBasket.getInitialState().paymentStatus;
      
      
      const isPaid = data.isPaid;
      if (!isPaid && storedOrderId == 'true') {
        if (currentRoute != "/1/2/basket") {
          // Выполнение редиректа на basket страницу в случае, если isPaid равен true
          return NextResponse.redirect(new URL("/1/2/basket", request.url));
        }
        return;
      } else {
       console.log('я тут')      
     }
   } catch (error) {
     console.error("Ошибка при обработке API:", error);
   }  
  }
}

export const config = {
  matcher: "/1/2/:path*",
};
