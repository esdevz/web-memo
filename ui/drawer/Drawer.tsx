import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerProps,
  DrawerBody,
  DrawerFooter,
  Text,
} from "@chakra-ui/react";

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
        <DrawerHeader>
          <Text as="h2">{drawerTitle}</Text>
        </DrawerHeader>
        <DrawerBody
          sx={{
            scrollbarWidth: "thin",
          }}
          padding={{ base: "0", md: "0.7rem" }}
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
