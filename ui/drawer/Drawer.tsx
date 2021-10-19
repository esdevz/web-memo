import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerProps,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/modal";

const CustomDrawer = ({
  controls,
  drawerTitle,
  children,
  ...rest
}: CustomDrawerProps) => {
  return (
    <Drawer {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader> {drawerTitle} </DrawerHeader>
        <DrawerBody> {children} </DrawerBody>
        <DrawerFooter>{controls}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

interface CustomDrawerProps extends DrawerProps {
  drawerTitle: string;
  controls: React.ReactNode;
}
