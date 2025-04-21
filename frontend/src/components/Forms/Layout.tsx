import Navbar from "@/components/Forms/Navbar.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "@/components/Forms/Footer.tsx";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { Toaster } from "sonner";

export const Layout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
    console.log(user);
    
  }, [user]);

  return (
    <div className="flex max-h-max min-h-screen w-full flex-col justify-between gap-10 overflow-x-auto bg-[#DDDCFF] font-[poppins]">
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="bottom-10 w-full justify-self-end">
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};
