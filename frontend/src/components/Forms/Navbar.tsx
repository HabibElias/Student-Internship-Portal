import { Home, LogIn, NotebookPen } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import CustomDrawer from "./Drawer";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between lg:px-32 py-8 px-4">
      <Logo />

      <div className="md:hidden">
        <CustomDrawer/>
      </div>
      <ul className="md:flex hidden gap-[71px] [&_a.active]:text-[#7D7ADA]">
          <NavLink to={"/"} className="flex items-center gap-2 font-semibold text-lg hover:opacity-40 duration-150  ">
            <Home />
            Home
          </NavLink>
          <NavLink to={"/forms/login"} className="flex items-center gap-2 font-semibold text-lg hover:opacity-40 duration-150  ">
            <LogIn />
            Login
          </NavLink>
          <NavLink to={"/forms/register"} className="flex items-center gap-2 font-semibold text-lg hover:opacity-40 duration-150  ">
            <NotebookPen />
            Register
          </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
