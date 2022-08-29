import { HStack, Button, useMediaQuery } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { TiDocumentDelete } from "react-icons/ti";

const NoteOptions = (props: NoteOptionProps) => {
  const [smallScreen] = useMediaQuery("(max-width: 41em)");
  return (
    <HStack spacing="1">
      <Button
        isLoading={props.savingState}
        colorScheme="teal"
        size="sm"
        onClick={props.save}
        gap="3px"
      >
        <FiSave /> {!smallScreen && "Save"}
      </Button>
      <Button onClick={props.delete} colorScheme="darkpink" size="sm" gap="3px">
        <TiDocumentDelete /> {!smallScreen && "Delete"}
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
