import { NavLink, useNavigate } from "react-router-dom";
import CustomDrawer from "./Drawer.tsx";
import { Button } from "../ui/button.tsx";
import Logo from "../Logo.tsx";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-8 py-8 text-white xl:px-20">
      <Logo />

      <nav>
        <div className="sm:[display:none]">
          <CustomDrawer />
        </div>
        <ul className="[display:none] items-center gap-8 sm:flex xl:gap-12">
          <NavLink
            to={"/"}
            className="text-lg font-semibold transition-opacity duration-200 hover:opacity-80"
          >
            Home
          </NavLink>
          <NavLink
            to={"/"}
            className="text-lg font-semibold transition-opacity duration-200 hover:opacity-80"
          >
            About
          </NavLink>
          <NavLink
            to={"/"}
            className="text-lg font-semibold transition-opacity duration-200 hover:opacity-80"
          >
            Contact
          </NavLink>
          <Button
            onClick={() => navigate("/forms/login")}
            className="cursor-pointer bg-[#7D7ADA] text-lg hover:bg-[#7D7ADA]/80"
          >
            Sign in
          </Button>
        </ul>
      </nav>
    </header>
  );
};
