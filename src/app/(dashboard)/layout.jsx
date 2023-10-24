import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layer from "@/components/Layer/Layer";

export default function DashboardLayout({ children }) {
  return (
    <main>
      <Layer children={children} />

      <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
    </main>
  );
}
