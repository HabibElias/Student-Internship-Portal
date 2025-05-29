import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

const CompanyLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // todo: protect this route only for company users
  useEffect(() => {
    if (user?.user_type !== "company") navigate("/unauthorized");
  }, []);

  return (
    <div className="relative overflow-clip">
      <div className="fixed z-20 w-full backdrop-blur-2xl">
        <Navbar />
      </div>
      <div className="min-h-screen w-full bg-[linear-gradient(to_right,#ffffff4d_50%,rgba(255,255,255,0)_100%),url(/assets/grid-lines.svg)] bg-contain bg-fixed bg-center bg-repeat-round">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default CompanyLayout;
