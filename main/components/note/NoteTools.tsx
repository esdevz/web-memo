import React from "react";
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiPushpinLine } from "react-icons/ri";
import { IoMdMore } from "react-icons/io";
import Colors from "./Colors";

type NoteToolsProps = {
  deleteNote: () => Promise<void>;
  isPinned: boolean;
  pinNote: () => Promise<void>;
  id: number;
  website: string;
};

const NoteTools = (props: NoteToolsProps) => {
  const handleKeyBoardEvt = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  return (
    <HStack spacing="1" onKeyPress={handleKeyBoardEvt} onKeyDown={handleKeyBoardEvt}>
      <Colors noteId={props.id} website={props.website} />
      <IconButton
        size="sm"
        colorScheme={props.isPinned ? "yellow" : "gray"}
        icon={<RiPushpinLine />}
        aria-label="pin"
        onClick={props.pinNote}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          size="sm"
          aria-label="more note options"
          icon={<IoMdMore />}
        />
        <MenuList>
          <MenuItem onClick={props.deleteNote}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NoteTools;
