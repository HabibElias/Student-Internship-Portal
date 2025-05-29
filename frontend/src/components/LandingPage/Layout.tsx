import { useAuth } from "@/providers/AuthProvider.tsx";
import { Outlet } from "react-router-dom";
import Loading from "../Loading.tsx";
import Footer from "./Footer.tsx";
import { Navbar } from "./Navbar.tsx";
import "./style.css";
import { useEffect } from "react";

export const Layout = () => {
  const { fetchState } = useAuth();

  if (fetchState == "notReady") return <Loading />;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
