import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

const StudentLayout = () => {
  // todo: protect this route only for student users
  
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
