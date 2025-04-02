import { Button } from "./ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Drawer,
  DrawerClose,
} from "./ui/drawer";

import { LogOut, Menu } from "lucide-react";

const CustomDrawer = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col p-4 gap-y-4">
          <Button variant={"default"}>Home</Button>
          <Button variant={"secondary"}>About</Button>
          <Button variant={"secondary"}>Contact</Button>
        </div>
        <DrawerFooter>
          <DrawerClose className="text-start">
            <Button variant="outline" className="w-full hover:cursor-pointer">
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
