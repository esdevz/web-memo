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
import { ChangeEvent, FormEvent, useRef } from "react";
import FormInput from "./FormInput";
import { initialNoteState, useBackgroundNote } from "./useBackgroundNotes";
import { getHostName, sanitizeHtml } from "../utils";

const Popup = () => {
  const { note, setNote, saveNote, loading } = useBackgroundNote();
  const contentRef = useRef<HTMLDivElement>(null);
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

  const setUrl = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
    });
    if (tab.url) {
      setNote({
        ...note,
        favicon: tab.favIconUrl || "",
        fullUrl: tab.url,
        website: getHostName(tab.url),
      });
    }
  };
  const resetNote = () => {
    setNote(initialNoteState);
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let newNote = {
      ...note,
      content: sanitizeHtml(contentRef.current?.innerHTML),
      createdAt: Date.now(),
    };
    await saveNote(newNote);
    browser.runtime.sendMessage({ msg: "NEW_NOTE" });
    resetNote();
  };

  const openNotes = () => {
    browser.tabs.create({
      url: browser.extension.getURL("index.html"),
      active: true,
    });
  };
  return (
    <Box as="main" w="380px" h="400px">
      <VStack h="100%" w="100%" spacing="1.5">
        <Button h="2.7em" w="full" colorScheme="teal" onClick={openNotes}>
          Open Notes
        </Button>

        <VStack
          as="form"
          onSubmit={handleSubmit}
          mt="8px"
          w="full"
          h="full"
          spacing="1.5"
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
          <VStack spacing="1" align="flex-start" h="13em" w="85%">
            <Text as="h3">Content :</Text>
            <Box
              ref={contentRef}
              contentEditable="true"
              w="full"
              maxW="full"
              h="full"
              border="1px solid rgba(128, 128, 128, 0.34)"
              borderRadius="2"
              p="1.5"
              spellCheck="false"
              overflow="auto"
              whiteSpace="pre-wrap"
              sx={{ scrollbarWidth: "thin" }}
              _focusVisible={{
                outline: "2px solid rgb(49, 130, 206)",
              }}
            >
              {note.content}
            </Box>
          </VStack>

          <HStack w="85%" justifyContent="space-between">
            <Text as="h3">Collection : {note.website}</Text>
            <Button
              h="2.5em"
              onClick={setUrl}
              ml="auto"
              colorScheme="teal"
              w="13ch"
              type="button"
            >
              Current URL
            </Button>
          </HStack>
          <HStack w="85%" justifyContent="space-between">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="is-pinned">Pin :</FormLabel>
              <Switch
                colorScheme="teal"
                name="isPinned"
                onChange={switchHandler}
                isChecked={note.isPinned}
                id="is-pinned"
              />
            </FormControl>
            <Button
              onClick={resetNote}
              h="2.5em"
              ml="auto"
              colorScheme="teal"
              w="18ch"
              type="button"
            >
              Clear
            </Button>
          </HStack>
          <Button
            isLoading={loading}
            isDisabled={loading}
            type="submit"
            colorScheme="teal"
            w="full"
            h="2.5em"
          >
            Save
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
export default Popup;
