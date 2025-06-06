import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo.tsx";
import { Button } from "../ui/button.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer.tsx";

import {
  BookmarkCheck,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Menu,
  File,
  Search,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useAuth } from "@/providers/AuthProvider.tsx";
import { isStudent } from "@/models/Student.ts";
import { useState } from "react";

const CustomDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const routes = ["dashboard", "findJobs", "savedJobs", "applications"];
  const routesIcon: Map<string, any> = new Map([
    ["dashboard", <LayoutDashboard />],
    ["findJobs", <Search fillOpacity={0} />],
    ["savedJobs", <BookmarkCheck fillOpacity={0} />],
    ["applications", <File />],
  ]);

  return (
    <Drawer open={open} direction="left">
      <DrawerTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"secondary"}
          size={"icon"}
          className="cursor-pointer rounded py-2 text-gray-600"
        >
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="items-start bg-[#7D7ADA]/20 font-[poppins] text-white backdrop-blur-2xl">
        <DrawerHeader className="relative w-full">
          <DrawerClose className="absolute right-3">
            <Button
              variant={"default"}
              size={"icon"}
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:bg-white/30"
            >
              <X />
            </Button>
          </DrawerClose>
          <DrawerTitle className="text-white">
            <Logo />
          </DrawerTitle>
          <DrawerDescription className="text-white/70">Menu</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-y-12 p-4">
          {routes.map((route, index) => (
            <NavLink
              key={index}
              to={route}
              onClick={() => setOpen(() => false)}
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
        </div>
        <DrawerFooter className="w-full">
          {user && (
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center justify-between rounded-xl bg-[#111]/30 p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        className="h-10 w-10 overflow-clip rounded-full"
                        src={
                          isStudent(user.data)
                            ? `${import.meta.env.VITE_API_URL}/image?img=${user.data.profile_picture}`
                            : ""
                        }
                      />
                      <AvatarFallback className="inline-flex rounded-full bg-gray-500 p-2 text-xs text-white">
                        {isStudent(user.data) &&
                          `${user.data.first_name.slice(0, 1).toUpperCase()} ${user.data.last_name.slice(0, 1).toUpperCase()}`}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-start">
                      <div>
                        {isStudent(user.data) &&
                          `${user.data.first_name} ${user.data.last_name}`}
                      </div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
              <ChevronsUpDown />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mb-3">
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
