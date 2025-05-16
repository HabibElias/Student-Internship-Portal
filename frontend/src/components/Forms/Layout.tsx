import Footer from "@/components/Forms/Footer.tsx";
import Navbar from "@/components/Forms/Navbar.tsx";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import Loading from "../Loading";

export const Layout = () => {
  const { user, fetchState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchState === "ready") {
      if (user) navigate("/dashboard");
    }
  }, [user]);

  if (fetchState === "notReady") return <Loading />;

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
