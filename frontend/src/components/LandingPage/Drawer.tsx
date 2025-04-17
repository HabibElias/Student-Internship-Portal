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

import { LogOut, Menu } from "lucide-react";

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
      <DrawerContent className="bg-[#0e181d] backdrop-blur-2xl">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-y-4 p-4">
          <Button variant={"secondary"} className="cursor-pointer">Home</Button>
          <Button variant={"secondary"} className="cursor-pointer">About</Button>
          <Button variant={"secondary"} className="cursor-pointer">Contact</Button>
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
