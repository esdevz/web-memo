import { HStack, Button, IconButton } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import { FiSave } from "react-icons/fi";
import { RiPushpinLine } from "react-icons/ri";

const NoteOptions = (props: NoteOptionProps) => {
  return (
    <HStack spacing="1">
      <Button
        isLoading={props.savingState}
        colorScheme="teal"
        size="sm"
        onClick={props.save}
        leftIcon={<FiSave />}
      >
        Save
      </Button>
      <IconButton
        size="sm"
        colorScheme={props.isPinned ? "yellow" : "gray"}
        icon={<RiPushpinLine />}
        aria-label="pin"
        onClick={props.pin}
      />
      <Button colorScheme="darkpink" size="sm" leftIcon={<BiX />}>
        Delete
      </Button>
    </HStack>
  );
};

export default NoteOptions;

interface NoteOptionProps {
  save: () => Promise<void>;
  savingState: boolean;
  pin: () => Promise<void>;
  isPinned: boolean;
}
