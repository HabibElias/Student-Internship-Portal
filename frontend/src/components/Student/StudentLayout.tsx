import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const StudentLayout = () => {
  return (
    <div className="overflow-clip">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="min-h-screen w-full bg-[url(/assets/grid-lines.svg)] bg-cover bg-fixed bg-center">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default StudentLayout;
