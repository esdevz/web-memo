import { BsSun, BsMoonFill } from "react-icons/bs";
import {
  useColorMode,
  IconButton,
  Tooltip,
  IconButtonProps,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

const option: Variants = {
  animate: {
    y: "0rem",
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
    },
  },
  idle: {
    y: "2rem",
    opacity: 0,
    scale: 0.8,
    transition: {
      type: "spring",
    },
  },
};

export const sidebarToggleTheme = async () => {
  let sidebarOpenState = await browser.sidebarAction.isOpen({});
  if (sidebarOpenState) browser.runtime.sendMessage({ msg: "TOGGLE_COLOR_MODE" });
};

const MotionButton = motion<IconButtonProps>(IconButton);

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const toggleMode = () => {
    toggleColorMode();
    sidebarToggleTheme();
  };

  return (
    <Tooltip label="Dark/Light Mode" placement="left">
      <MotionButton
        colorScheme="bb"
        m="0.7em"
        boxSize="2.85em"
        variants={option}
        borderRadius="33%"
        icon={isDark ? <BsMoonFill size="1.3em" /> : <BsSun size="1.3em" />}
        aria-label={isDark ? "dark mode" : "light mode"}
        onClick={toggleMode}
      />
    </Tooltip>
  );
};
