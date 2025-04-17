import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.tsx";
import Footer from "./Footer.tsx";

export const Layout = () => {
  return (
    <div className="relative flex flex-col font-[poppins]">
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};


