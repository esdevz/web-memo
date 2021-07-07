import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent } from "react";

import FormInput from "./FormInput";
import { initialNoteState, useBackgroundNote } from "./useBackgroundNotes";

const Popup = () => {
  const { note, setNote, saveNote, loading } = useBackgroundNote();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await saveNote();

    setNote(initialNoteState);
  };

  const openNotes = () => {
    browser.tabs.create({
      url: browser.extension.getURL("index.html"),
      active: true,
    });
  };
  return (
    <Box as="main" w="380px" h="400px">
      <VStack h="100%" w="100%" spacing="10px">
        <Button w="full" colorScheme="teal" onClick={openNotes}>
          Open Notes
        </Button>

        <VStack
          as="form"
          onSubmit={handleSubmit}
          mt="8px"
          w="full"
          h="full"
          spacing="8px"
          p="3"
        >
          <FormInput
            w="85%"
            id="Title :"
            inputProps={{
              w: "full",
              type: "text",
              name: "title",
              value: note.title,
              onChange: handleChange,
              placeholder: "Title",
            }}
          />
          <FormInput
            w="85%"
            id="Content :"
            textField
            textAreaProps={{
              w: "full",
              name: "content",
              value: note.content,
              onChange: handleChange,
              placeholder: "Content",
              h: "11em",
            }}
          />
          <HStack w="85%" justifyContent="space-between">
            <Text as="h3" colorScheme="messenger">
              Collection : {note.website}
            </Text>
            <Button
              onClick={() => setNote(initialNoteState)}
              ml="auto"
              colorScheme="teal"
              w="7ch"
              type="button"
            >
              Clear
            </Button>
          </HStack>
          <FormControl w="85%" display="flex" alignItems="center">
            <FormLabel htmlFor="is-pinned">Pin :</FormLabel>
            <Switch
              size="lg"
              colorScheme="teal"
              name="isPinned"
              onChange={switchHandler}
              isChecked={note.isPinned}
              id="is-pinned"
            />
          </FormControl>
          <Button
            isLoading={loading}
            isDisabled={loading}
            type="submit"
            colorScheme="teal"
            w="full"
          >
            Save
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
export default Popup;
