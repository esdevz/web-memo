import { HStack, Button } from "@chakra-ui/react";
import { BiPin, BiX } from "react-icons/bi";
import { FiSave } from "react-icons/fi";

const NoteOptions = ({ save }: NoteOptionProps) => {
  return (
    <HStack spacing="1">
      <Button colorScheme="teal" size="sm" onClick={save} leftIcon={<FiSave />}>
        Save
      </Button>
      <Button colorScheme="yellow" size="sm" leftIcon={<BiPin />}>
        Pin
      </Button>
      <Button colorScheme="darkpink" size="sm" leftIcon={<BiX />}>
        Delete
      </Button>
    </HStack>
  );
};

export default NoteOptions;

interface NoteOptionProps {
  save: () => void;
}
