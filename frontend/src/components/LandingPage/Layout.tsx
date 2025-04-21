import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import { useAuth } from "@/providers/AuthProvider.tsx";
import { useEffect } from "react";

export const Layout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
    console.log(user);
  }, [user]);

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
