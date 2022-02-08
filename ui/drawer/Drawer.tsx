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
import { useColorModeValue } from "@chakra-ui/react";

const CustomDrawer = ({
  controls,
  drawerTitle,
  children,
  ...rest
}: CustomDrawerProps) => {
  const thumbColor = useColorModeValue("rgba(0, 0, 0 , 0.2)", "rgba(255,255,255,0.3)");
  return (
    <Drawer {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader> {drawerTitle} </DrawerHeader>
        <DrawerBody
          sx={{
            "::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: thumbColor,
              borderRadius: "8px",
            },
          }}
        >
          {children}
        </DrawerBody>
        <DrawerFooter>{controls}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;

interface CustomDrawerProps extends DrawerProps {
  drawerTitle: string;
  controls?: React.ReactNode;
}
