import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useAuth } from "@/providers/AuthProvider.tsx";
import { useLayoutEffect } from "react";
import "./style.css";
import Loading from "../Loading.tsx";

export const Layout = () => {
  const { user, fetchState } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user) navigate("/dashboard");
    console.log(user);
  }, [user]);

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
