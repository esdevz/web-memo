import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiPin, BiX } from "react-icons/bi";
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
        <MenuItem icon={<BiPin />}>Pin</MenuItem>
        <MenuItem icon={<FiEdit />}>Edit</MenuItem>
        <MenuItem icon={<BiX />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NoteOptions;
