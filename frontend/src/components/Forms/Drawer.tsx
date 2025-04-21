import { NavLink } from "react-router-dom";
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

import { Home, LogIn, Menu, NotebookPen, X } from "lucide-react";

const CustomDrawer = () => {
  const routesIcons: Map<string, any> = new Map([
    ["", <Home size={18} />],
    ["/login", <LogIn size={18} />],
    ["/register", <NotebookPen size={18} />],
  ]);

  const routes: string[] = ["", "/login", "/register"];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"secondary"}
          className="cursor-pointer rounded py-2 text-gray-600"
        >
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#DDDCFF]/70 backdrop-blur-2xl">
        <DrawerHeader>
          <DrawerTitle>
            <Logo />
          </DrawerTitle>
          <DrawerDescription>Menu</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-y-4 p-4 [&_a.active]:bg-[#0e181d] [&_a.active]:text-white">
          {routes.map((route, index) => (
            <NavLink
              to={route}
              key={index}
              className="w-ful bg-accent flex cursor-pointer items-center justify-center gap-2 rounded-lg p-2 text-center text-[0.9rem] font-[600] shadow-xs duration-150 hover:opacity-90"
            >
              {routesIcons.get(route)}
              {!route
                ? "Home"
                : route.slice(1, 2).toUpperCase() + route.slice(2)}
            </NavLink>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose className="text-start">
            <Button variant={"outline"} className="w-full hover:cursor-pointer">
              <X />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
