"use client";
import { store } from "@/store/store";
import "../styles/global.css";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationEvents from "@/components/NavigationEvents/NavigationEvents";
import { Suspense } from "react";

// export const metadata = {
//   title: "Admin panel",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html>
    </Provider>
  );
}
