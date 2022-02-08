import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useColorMode, IconButton, Tooltip, IconButtonProps } from "@chakra-ui/react";
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

const MotionButton = motion<IconButtonProps>(IconButton);

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const toggleMode = async () => {
    toggleColorMode();
    const views = chrome.extension.getViews({ type: "popup" });
    if (views.length > 0) {
      chrome.runtime.sendMessage({ msg: "TOGGLE_COLOR_MODE" });
    }
  };
  return (
    <Tooltip label="Dark/Light Mode" placement="left">
      <MotionButton
        colorScheme="bb"
        m="0.7em"
        boxSize="2.85em"
        variants={option}
        borderRadius="33%"
        icon={isDark ? <BsMoon size="1.3em" /> : <BsSun size="1.3em" />}
        aria-label={isDark ? "dark mode" : "light mode"}
        onClick={toggleMode}
      />
    </Tooltip>
  );
};
