import React, { useCallback, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Tooltip,
  IconButton,
  BoxProps,
  IconButtonProps,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { BiCog } from "react-icons/bi";
import { GoSettings } from "react-icons/go";
import { BsLayoutSidebar } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { DarkModeSwitch } from "./DarkModeSwitch";
import useNoteStore from "../../store/noteStore";
import { useKeyboard } from "../../hooks/useKeyboard";

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
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
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
      type: "spring",
    },
  },
  idle: {
    y: "2rem",
    opacity: 0,
    rotate: 0.8,
    transition: {
      type: "spring",
    },
  },
};

const MotionBox = motion<BoxProps>(Box);
const MotionButton = motion<IconButtonProps>(IconButton);

const styleProps = {
  m: "0.7em",
  boxSize: "2.85em",
  borderRadius: "30%",
};

const Settings = (props: SettingsProps) => {
  const [layout, setLayout] = useNoteStore(
    useCallback((state) => [state.tabLayout, state.updateLayout], [])
  );

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [showMenu, setShowMenu] = useState(false);

  const showSettings = () => {
    setShowMenu((current) => !current);
  };
  const updateLayout = () => {
    setLayout(layout === "default" ? "minimized" : "default");
  };

  useKeyboard({
    collection: props.openModal,
    search: props.openDrawer,
    toggleLayout: updateLayout,
  });

  return (
    <Box pos="fixed" bottom="1em" right="0">
      <AnimatePresence>
        {showMenu && (
          <MotionBox
            display="flex"
            flexDirection="column-reverse"
            alignItems="center"
            key="options"
            initial="idle"
            exit="idle"
            animate="animate"
            variants={optionList}
          >
            <Tooltip label="Edit collection | ctrl + alt + c" placement="left">
              <MotionButton
                onClick={props.openModal}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<GoSettings />}
                aria-label="edit collection"
              />
            </Tooltip>
            <Tooltip label="Search Notes | ctrl + alt + f" placement="left">
              <MotionButton
                onClick={props.openDrawer}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<AiOutlineFileSearch />}
                aria-label="layout type"
              />
            </Tooltip>
            <Tooltip label="Toggle Tabs" placement="left">
              <MotionButton
                onClick={updateLayout}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<BsLayoutSidebar />}
                aria-label="layout type"
              />
            </Tooltip>
            <DarkModeSwitch />
          </MotionBox>
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
