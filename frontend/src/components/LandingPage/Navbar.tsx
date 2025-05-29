import { NavLink } from "react-router-dom";
import CustomDrawer from "./Drawer.tsx";
import { Button } from "../ui/button.tsx";
import Logo from "../Logo.tsx";
import { useAuth } from "@/providers/AuthProvider.tsx";

export const Navbar = () => {
  const routesId: Map<string, string> = new Map([
    ["Home", "#home"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ]);

  const routes = ["Home", "About", "Contact"];
  const {user} = useAuth();

  return (
    <header className="flex items-center bg-[#0e181d] justify-between px-8 py-8 text-white xl:px-20">
      <Logo />

      <nav>
        <div className="sm:[display:none]">
          <CustomDrawer />
        </div>
        <ul className="[display:none] items-center gap-8 sm:flex xl:gap-12">
          {routes.map((route, index) => (
            <a
              key={index}
              href={`/${routesId.get(route)}`}
              className="text-lg font-semibold transition-opacity duration-200 hover:opacity-80"
            >
              {route}
            </a>
          ))}

            {/* Check if user exists, show avatar and dashboard link, else show Sign in */}
            {user ? (
            <NavLink to="/dashboard">
            <Button className="cursor-pointer bg-[#7D7ADA] text-lg hover:bg-[#7D7ADA]/80">
              Dashboard
            </Button>
            </NavLink>
            ) : (
            <NavLink to="/login">
              <Button className="cursor-pointer bg-[#7D7ADA] text-lg hover:bg-[#7D7ADA]/80">
              Sign in
              </Button>
            </NavLink>
            )}
        </ul>
      </nav>
    </header>
  );
};
