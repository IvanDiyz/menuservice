'use client'
import ClientMain from "@/components/ClientMain/ClientMain";
import Notificate from "@/components/Notificate/Notificate";
import { useAppDispatch } from "@/hooks/redux";
import { clearDishis } from "@/store/getDishis/getDishis";
import { useEffect } from "react";

const Page = async ({params}) => {
  const dispath = useAppDispatch();
  
  useEffect(() => {
    dispath(clearDishis())
    localStorage.setItem("venueId", params.idvenue);
    localStorage.setItem("tableId", params.idtable);
  }, [])
  
  return (
    <>
      <ClientMain params={params}/>
      <Notificate />
    </>
  );
};
export default Page;
