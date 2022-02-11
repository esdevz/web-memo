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
import { NotificationMessage } from "../../store/types";

type NoteToolsProps = {
  deleteNote: () => Promise<void>;
  isPinned: boolean;
  pinNote: () => Promise<void>;
  setNoteColor: (
    id: number,
    clr: string,
    website: string
  ) => Promise<NotificationMessage>;
  id: number;
  website: string;
};

const NoteTools = (props: NoteToolsProps) => {
  return (
    <HStack spacing="1">
      <Colors
        setNoteColor={props.setNoteColor}
        noteId={props.id}
        website={props.website}
      />
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
          <MenuItem fontSize="1.1em" onClick={props.deleteNote}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NoteTools;
