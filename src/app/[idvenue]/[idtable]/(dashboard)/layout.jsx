import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layer from "@/components/Layer/Layer";

export default function DashboardLayout({ children, params }) {
  return (
    <div>
      <Layer children={children} params={params} />
      <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
    </div>
  );
}
