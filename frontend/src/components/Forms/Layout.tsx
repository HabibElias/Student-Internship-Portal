import Navbar from "@/components/Forms/Navbar.tsx";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Forms/Footer.tsx";

export const Layout = () => {
  return (
    <div className="flex gap-10 max-h-max min-h-screen w-full flex-col justify-between overflow-x-auto bg-[#DDDCFF] font-[poppins]">
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="bottom-10 w-full justify-self-end">
        <Footer />
      </div>
    </div>
  );
};
