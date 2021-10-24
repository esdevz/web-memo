import React, { useCallback, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { BiCog } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { BsLayoutSidebar } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { useColorMode } from "@chakra-ui/color-mode";
import useNoteStore from "../../store/noteStore";
import { Tooltip } from "@chakra-ui/react";

const optionList: Variants = {
  idle: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cog: Variants = {
  idle: {
    rotate: "0deg",
    transition: {
      type: "spring",
    },
  },
  animate: {
    rotate: "90deg",
    transition: {
      type: "spring",
    },
  },
};

const option: Variants = {
  animate: {
    y: "0rem",
    opacity: 1,
    scale: 1,
    transition: {
      y: {
        stiffness: 500,
      },
    },
  },
  idle: {
    y: "2rem",
    opacity: 0,
    scale: 0.3,
    transition: {
      y: { stiffness: 500 },
    },
  },
};

const styleProps = {
  m: "0.7em",
  boxSize: "2.85em",
  borderRadius: "30%",
} as const;

const Settings = (props: SettingsProps) => {
  const [layout, setLayout] = useNoteStore(
    useCallback((state) => [state.tabLayout, state.updateLayout], [])
  );

  const [showMenu, setShowMenu] = useState(false);

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const showSettings = () => {
    setShowMenu((current) => !current);
  };

  const updateLayout = () => {
    setLayout(layout === "default" ? "minimized" : "default");
  };

  return (
    <Box pos="fixed" bottom="1em" right="0">
      <AnimatePresence>
        {showMenu && (
          <Box
            as={motion.div}
            display="flex"
            flexDirection="column-reverse"
            alignItems="center"
            key="options"
            initial="idle"
            exit="idle"
            animate="animate"
            variants={optionList}
          >
            <Tooltip label="Edit collection" placement="left">
              <IconButton
                onClick={props.openModal}
                as={motion.button}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<GoSettings />}
                aria-label="edit collection"
              />
            </Tooltip>
            <Tooltip label="Search Notes" placement="left">
              <IconButton
                as={motion.button}
                onClick={props.openDrawer}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<AiOutlineFileSearch />}
                aria-label="layout type"
              />
            </Tooltip>
            <Tooltip label="Toggle Tabs" placement="left">
              <IconButton
                as={motion.button}
                onClick={updateLayout}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<BsLayoutSidebar />}
                aria-label="layout type"
              />
            </Tooltip>
            <DarkModeSwitch />
          </Box>
        )}
      </AnimatePresence>

      <IconButton
        as={motion.button}
        onClick={showSettings}
        animate={showMenu ? "animate" : "idle"}
        variants={cog}
        {...styleProps}
        icon={<BiCog color={isDark ? "#ebdf2d" : "darkgoldenrod"} />}
        aria-label="settings"
        _focus={{
          outlineColor: "transparent",
        }}
      />
    </Box>
  );
};

export default Settings;

interface SettingsProps {
  openModal: () => void;
  openDrawer: () => void;
}
