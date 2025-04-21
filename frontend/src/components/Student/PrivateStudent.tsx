import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivateStudent = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="overflow-clip">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="bg-center bg-cover bg-fixed bg-[url(/assets/grid-lines.svg)] min-h-screen w-full">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PrivateStudent;
