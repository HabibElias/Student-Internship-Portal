import { Home, LogIn, NotebookPen } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import CustomDrawer from "./Drawer";

const routesIcons: Map<string, any> = new Map([
  ["", <Home />],
  ["/login", <LogIn />],
  ["/register", <NotebookPen />],
]);

const routes: string[] = ["", "/login", "/register"];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-8 lg:px-32">
      <Logo />

      <div className="md:hidden">
        <CustomDrawer />
      </div>
      <ul className="hidden gap-[71px] md:flex [&_a.active]:text-[#7D7ADA]">
        {routes.map((route, index) => (
          <NavLink
            key={index}
            to={route}
            className="flex items-center gap-2 text-lg font-semibold duration-150 hover:opacity-40"
          >
            {routesIcons.get(route)}
            {!route ? "Home" : route.slice(1, 2).toUpperCase() + route.slice(2)}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
