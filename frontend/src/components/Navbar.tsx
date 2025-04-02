import { NavLink } from "react-router-dom";
import CustomDrawer from "./Drawer";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between">
      <h1>Student Internship Portal</h1>

      <nav>
        <div className="sm:[display:none]">
          <CustomDrawer />
        </div>
        <ul className="[display:none] sm:flex items-center gap-4">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/"}>About</NavLink>
          <NavLink to={"/"}>Contact</NavLink>
        </ul>
      </nav>
    </header>
  );
};
