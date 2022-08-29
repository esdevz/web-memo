import { useCallback, useEffect, useState } from "react";
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
import { DarkModeSwitch, sidebarToggleTheme } from "./DarkModeSwitch";
import useNoteStore from "../../store/noteStore";

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

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [showMenu, setShowMenu] = useState(false);

  const showSettings = () => {
    setShowMenu((current) => !current);
  };
  const updateLayout = useCallback(() => {
    setLayout(layout === "default" ? "minimized" : "default");
  }, [layout, setLayout]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case e.ctrlKey && e.altKey && "f":
        case e.ctrlKey && e.altKey && "F":
          props.openDrawer();
          break;
        case e.ctrlKey && e.altKey && "c":
        case e.ctrlKey && e.altKey && "C":
          props.openModal();
          break;
        case e.ctrlKey && e.altKey && "l":
        case e.ctrlKey && e.altKey && "L":
          updateLayout();
          break;
        case e.ctrlKey && e.altKey && "d":
        case e.ctrlKey && e.altKey && "D":
          toggleColorMode();
          sidebarToggleTheme();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [props, toggleColorMode, updateLayout]);

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
            <Tooltip label="Edit collection | Ctrl alt c" placement="left">
              <MotionButton
                onClick={props.openModal}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<GoSettings />}
                aria-label="edit collection"
              />
            </Tooltip>
            <Tooltip label="Search Notes | Ctrl alt f" placement="left">
              <MotionButton
                onClick={props.openDrawer}
                variants={option}
                {...styleProps}
                colorScheme="bb"
                icon={<AiOutlineFileSearch />}
                aria-label="layout type"
              />
            </Tooltip>
            <Tooltip label="Toggle Tabs Layout | Ctrl alt l" placement="left">
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
