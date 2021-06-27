import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiPalette, BiPin, BiX } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

const NoteOptions = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiDotsVerticalRounded />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<BiPin />} command="⌘T">
          Pin
        </MenuItem>
        <MenuItem icon={<FiEdit />} command="⌘O">
          Edit
        </MenuItem>
        <MenuItem icon={<BiPalette />} command="⌘⇧N">
          Change Color
        </MenuItem>
        <MenuItem icon={<BiX />} command="⌘N">
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NoteOptions;
