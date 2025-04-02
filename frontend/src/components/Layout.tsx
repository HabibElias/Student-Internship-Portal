import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layout = () => {
  return (
    <div className="p-5 flex flex-col  font-[poppins]">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
};

export default Layout;
