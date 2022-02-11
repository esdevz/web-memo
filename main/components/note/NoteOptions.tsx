import React from "react";
import { HStack, Button } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { TiDocumentDelete } from "react-icons/ti";

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
      <Button
        onClick={props.delete}
        colorScheme="darkpink"
        size="sm"
        leftIcon={<TiDocumentDelete />}
      >
        Delete
      </Button>
    </HStack>
  );
};

export default NoteOptions;

interface NoteOptionProps {
  save: () => Promise<void>;
  savingState: boolean;
  delete: () => Promise<void>;
}
