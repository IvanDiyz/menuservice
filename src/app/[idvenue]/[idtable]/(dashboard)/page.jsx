import ClientMain from "@/components/ClientMain/ClientMain";
import Notificate from "@/components/Notificate/Notificate";

const Page = async ({ params }) => {
  return (
    <>
      <ClientMain params={params} />
      <Notificate />
    </>
  );
};
export default Page;
