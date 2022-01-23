import { Menu, MenuButton, IconButton, MenuList, useColorMode } from "@chakra-ui/react";
import React from "react";
import { IoColorPaletteSharp } from "react-icons/io5";

const clrSwitch: Record<"light" | "dark", Record<string, string>> = {
  light: {
    default: "white",
    yellow: "yellow.100",
    gray: "gray.200",
    purple: "purple.100",
    teal: "teal.100",
    red: "red.100",
    pink: "pink.100",
    green: "green.100",
    cyan: "cyan.100",
    blue: "blue.100",
  },
  dark: {
    default: "gray.800",
    yellow: "yellow.900",
    gray: "gray.600",
    purple: "purple.900",
    teal: "teal.800",
    red: "red.900",
    pink: "pink.800",
    green: "green.900",
    cyan: "cyan.900",
    blue: "blue.800",
  },
};

const Colors = () => {
  const { colorMode } = useColorMode();
  return (
    <Menu placement="top-start">
      <MenuButton
        as={IconButton}
        size="sm"
        variant="outline"
        colorScheme="purple"
        icon={<IoColorPaletteSharp />}
        aria-label="change background color"
      />
      <MenuList>
        {Object.entries(clrSwitch[colorMode]).map(([clr, val]) => (
          <IconButton
            variant="unstyled"
            aria-label={clr}
            key={clr}
            bgColor={val}
            border="1px solid rgba(128, 128, 128, 0.34)"
            size="xs"
            isRound
            marginInline="1"
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default Colors;
