import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { isCompany } from "@/models/Company";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  BriefcaseMedical,
  Files,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "../ui/button";
import CustomDrawer from "./Drawer";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const routes = ["dashboard", "applicants", "job"];
  const routesIcon: Map<string, any> = new Map([
    ["dashboard", <LayoutDashboard />],
    ["applicants", <Files fillOpacity={0} />],
    ["job", <BriefcaseMedical fillOpacity={0} />],
  ]);

  return (
    <header className="flex items-center justify-between bg-(--purpleLight)/30 px-4 py-6 font-[poppins] xl:px-12">
      <Link to={"/"}>
        <Logo />
      </Link>

      <div className="md:hidden">
        <CustomDrawer />
      </div>
      <nav className="hidden flex-wrap gap-12 md:inline-flex">
        {routes.map((route, index) => (
          <NavLink
            key={index}
            to={route}
            className={cn(
              "group flex items-center gap-3 text-xs font-[500] xl:text-base [a.active]:text-[#7D7ADA]",
            )}
          >
            <div className="group-[a.active]:animate-bounce *:group-[a.active]:[fill:#7D7ADA] group-[a.active]:group-hover:animate-none">
              {routesIcon.get(route)}
            </div>
            <span className="hidden xl:inline">
              {route.slice(0, 1).toUpperCase() + route.slice(1)}
            </span>
          </NavLink>
        ))}
        {/* <DarkThemeToggle /> */}
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="h-10 w-10 overflow-clip rounded-full"
                  src={
                    isCompany(user.data)
                      ? `${import.meta.env.VITE_API_URL}/image?img=${user.data.company_image}`
                      : ""
                  }
                />
                <AvatarFallback className="rounded-full bg-gray-500 px-2.5 py-[8px] text-white">
                  {isCompany(user.data) &&
                    user.data.company_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mt-3 mr-10 grid gap-4 rounded-md bg-white/50 p-3 font-[poppins] backdrop-blur-2xl">
              <div>
                <div>{isCompany(user.data) && user.data.company_name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
              <div className="h-0.5 w-full rounded-full bg-gray-400"></div>
              <div className="flex flex-col gap-3 *:cursor-pointer">
                <Button
                  onClick={() => navigate("/profile")}
                  variant={"outline"}
                >
                  <User />
                  Edit Profile
                </Button>
                <Button variant={"outline"} onClick={() => logout()}>
                  <LogOut />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
