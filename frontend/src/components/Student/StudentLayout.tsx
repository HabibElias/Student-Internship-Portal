import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

const StudentLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // todo: protect this route only for company users
  useEffect(() => {
    if (user?.user_type !== "student") navigate("/unauthorized");
    return;
  }, []);

  return (
    <div className="relative overflow-clip">
      <div className="fixed z-20 w-full backdrop-blur-2xl">
        <Navbar />
      </div>
      <div className="min-h-screen w-full bg-[url(/assets/grid-lines.svg)] bg-contain bg-fixed bg-center bg-repeat-round">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default StudentLayout;
