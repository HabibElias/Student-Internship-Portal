import { NavLink } from "react-router-dom";
import Logo from "../Logo.tsx";
import { Button } from "../ui/button.tsx";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Drawer,
  DrawerClose,
} from "../ui/drawer.tsx";

import { Home, LogIn, LogOut, Menu, NotebookPen } from "lucide-react";

const CustomDrawer = () => {
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
        <div className="flex flex-col gap-y-4 p-4 [&_a.active]:bg-[#0e181d] [&_a.active]:text-white [&_a.active]:">
          <NavLink to={"/"} className="cursor-pointer w-ful flex gap-2 items-center text-center bg-accent p-2 hover:opacity-90 duration-150  rounded-lg shadow-xs justify-center text-[0.9rem] font-[600]">
            <Home size={18} />
            Home
          </NavLink>
          <NavLink to={"/forms/login"} className="cursor-pointer w-ful flex gap-2 items-center text-center bg-accent p-2  hover:opacity-90 duration-150 rounded-lg shadow-xs justify-center text-[0.9rem] font-[600]">
            <LogIn size={18} />
            Login
          </NavLink>
          <NavLink to={"/forms/register"} className="cursor-pointer w-ful flex gap-2 items-center text-center bg-accent p-2  hover:opacity-90 duration-150 rounded-lg shadow-xs justify-center text-[0.9rem] font-[600]">
            <NotebookPen size={18} />
            Register
          </NavLink>
        </div>
        <DrawerFooter>
          <DrawerClose className="text-start">
            <Button variant={"outline"} className="w-full hover:cursor-pointer">
              <LogOut />
              Logout
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
