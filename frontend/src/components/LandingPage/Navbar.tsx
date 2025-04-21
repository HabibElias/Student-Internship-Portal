import { NavLink } from "react-router-dom";
import CustomDrawer from "./Drawer.tsx";
import { Button } from "../ui/button.tsx";
import Logo from "../Logo.tsx";

export const Navbar = () => {
  const routesId: Map<string, string> = new Map([
    ["Home", "#home"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ]);

  const routes = ["Home", "About", "Contact"];

  return (
    <header className="flex items-center justify-between px-8 py-8 text-white xl:px-20">
      <Logo />

      <nav>
        <div className="sm:[display:none]">
          <CustomDrawer />
        </div>
        <ul className="[display:none] items-center gap-8 sm:flex xl:gap-12">
          {routes.map((route, index) => (
            <a
              key={index}
              href={`${routesId.get(route)}`}
              className="text-lg font-semibold transition-opacity duration-200 hover:opacity-80"
            >
              {route}
            </a>
          ))}

          <NavLink to={"/login"}>
            <Button className="cursor-pointer bg-[#7D7ADA] text-lg hover:bg-[#7D7ADA]/80">
              Sign in
            </Button>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
