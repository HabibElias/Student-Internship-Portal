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
  DrawerTrigger
} from "../ui/drawer.tsx";

import { LogIn, Menu, X } from "lucide-react";

const CustomDrawer = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          variant={"secondary"}
          className="cursor-pointer rounded py-2 text-gray-600"
        >
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="items-start bg-black/20 text-white backdrop-blur-2xl">
        <DrawerHeader className="relative w-full">
          <DrawerClose className="absolute right-3">
            <Button
              variant={"default"}
              className="cursor-pointer hover:bg-white/30"
            >
              <X />
            </Button>
          </DrawerClose>
          <DrawerTitle className="text-white">
            <Logo />
          </DrawerTitle>
          <DrawerDescription>Menu</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-y-4 p-4">
          <Button variant={"link"} className="w-max cursor-pointer text-white">
            Home
          </Button>
          <Button variant={"link"} className="w-max cursor-pointer text-white">
            About
          </Button>
          <Button variant={"link"} className="w-max cursor-pointer text-white">
            Contact
          </Button>
        </div>
        <DrawerFooter>
          <NavLink to={"/login"}>
            <Button className="cursor-pointer bg-[#7D7ADA] text-base hover:bg-[#7D7ADA]/80">
              <LogIn />
              Sign in
            </Button>
          </NavLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
