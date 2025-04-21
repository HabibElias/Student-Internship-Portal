import { useAuth } from "@/providers/AuthProvider";
import Logo from "../Logo";
import {
  BookmarkCheck,
  LayoutDashboard,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import CustomDrawer from "./Drawer";

const Navbar = () => {
  const { user, logout } = useAuth();
  const routes = ["dashboard", "findJobs", "savedJobs"];
  const routesIcon: Map<string, any> = new Map([
    ["dashboard", <LayoutDashboard />],
    ["findJobs", <Search fillOpacity={0} />],
    ["savedJobs", <BookmarkCheck fillOpacity={0} />],
  ]);

  return (
    <header className="flex items-center justify-between bg-[rgba(191,189,255,0.54)] px-4 xl:px-12 py-8 font-[poppins]">
      <Logo />

      <div className="md:hidden">
        <CustomDrawer />
      </div>
      <nav className="hidden gap-12 md:inline-flex flex-wrap">
        {routes.map((route, index) => (
          <NavLink
            key={index}
            to={route}
            className={cn(
              "group flex items-center gap-3 text-base font-[500] [a.active]:text-[#7D7ADA]",
            )}
          >
            <div className="group-[a.active]:animate-bounce *:group-[a.active]:[fill:#7D7ADA] group-[a.active]:group-hover:animate-none">
              {routesIcon.get(route)}
            </div>
            {route.slice(0, 1).toUpperCase() + route.slice(1)}
          </NavLink>
        ))}

        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="h-10 w-10 overflow-clip rounded-full"
                  src={`${import.meta.env.VITE_API_URL}/image?img=${user.profile}`}
                />
                <AvatarFallback className="rounded-full bg-gray-500 p-2 text-white">
                  {`${user.firstName.slice(0, 1).toUpperCase()} ${user.lastName
                    .slice(0, 1)
                    .toUpperCase()}`}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="mt-3 mr-10 grid gap-4 rounded-md bg-white/50 p-3 backdrop-blur-2xl">
                <div>
                  <div>{`${user.firstName} ${user.lastName}`}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
                <div className="h-0.5 w-full rounded-full bg-gray-400"></div>
                <div className="flex flex-col gap-3 *:cursor-pointer">
                  <Button variant={"outline"}>
                    <User />
                    Edit Profile
                  </Button>
                  <Button variant={"outline"} onClick={() => logout()}>
                    <LogOut />
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
