import { useAuth } from "@/providers/AuthProvider.tsx";
import { Outlet } from "react-router-dom";
import Loading from "../Loading.tsx";
import Footer from "./Footer.tsx";
import { Navbar } from "./Navbar.tsx";
import "./style.css";

export const Layout = () => {
  const { fetchState } = useAuth();

  if (fetchState == "notReady") return <Loading />;

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
