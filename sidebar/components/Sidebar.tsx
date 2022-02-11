import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
  CircularProgress,
} from "@chakra-ui/react";
import FormInput from "../../ui/form/FormInput";
import DataList from "../../ui/form/DataList";
import Editable from "./Editable";
import { initialNoteState, useBackgroundNote } from "../hooks/useBackgroundNotes";
import { getHostName } from "../../utils";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { CustomIcon } from "../../main/store/types";
import { setBadgeTempNote } from "../../utils/badgeColors";

const port = chrome.runtime.connect({ name: "popup" });

const Sidebar = () => {
  const { note, setNote, saveNote, loading, collections, draftNoteLoading } =
    useBackgroundNote();
  const [icon, setIcon] = useState<CustomIcon>("default");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newNote = {
      ...note,
      favicon: e.target.name === "website" ? "" : note.favicon,
      [e.target.name]: e.target.value,
    };
    setNote(newNote);
    port.postMessage({ msg: "EDITING", note: newNote });
  };
  const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [e.target.name]: e.target.checked,
    });
  };

  const setUrl = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
    });
    if (tab.url) {
      const newNote = {
        ...note,
        favicon: tab.favIconUrl || "",
        fullUrl: tab.url,
        website: getHostName(tab.url),
        title: tab.title || note.title,
      };

      setNote(newNote);
      port.postMessage({ msg: "EDITING", note: newNote });
    }
  };
  const resetNote = () => {
    setNote(initialNoteState);
    port.postMessage({ msg: "RESET" });
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  const handleIconChange = (option: CustomIcon) => {
    setIcon(option);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newNote = {
      ...note,
      content: sanitizeHtml(contentRef.current?.innerHTML),
      createdAt: Date.now(),
      website: note.website.trim() || "notes",
    };
    await saveNote(newNote, icon);
    port.postMessage({ msg: "NOTE_SAVED" });

    const existingCollection = collections.includes(newNote.website);
    let collectionProps = existingCollection
      ? {}
      : {
          displayName: newNote.website,
          customIconType: icon,
          favicon: newNote.favicon,
        };
    chrome.runtime.sendMessage({ msg: "NEW_NOTE", collectionProps });

    resetNote();
  };

  const openNotes = () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("main/index.html"),
      active: true,
    });
  };

  const onInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    setBadgeTempNote();
    const newNote = {
      ...note,
      content: e.currentTarget.innerHTML,
      createdAt: Date.now(),
    };
    port.postMessage({ msg: "EDITING", note: newNote });
  };

  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const data = e.clipboardData.getData("text/html");
    if (data.length !== 0) {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection?.rangeCount) return false;

      selection.deleteFromDocument();
      let node = document.createElement("div");
      node.innerHTML = sanitizeHtml(data).trim();
      selection.getRangeAt(0).insertNode(node);
      port.postMessage({
        msg: "EDITING",
        note: {
          ...note,
          content: contentRef.current?.innerHTML,
          createdAt: Date.now(),
        },
      });
    }
  };

  return (
    <Box as="main" minH="50em" minW="33em" w="35em">
      <VStack h="100%" w="100%" spacing="1.5">
        <Button
          h="2.7em"
          w="full"
          borderRadius="0"
          colorScheme="bb"
          variant="outline"
          onClick={openNotes}
          fontWeight="bold"
        >
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
            w="95%"
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
          <VStack spacing="1" align="flex-start" h="20rem" w="95%">
            <Text as="h3">
              Content :
              <Box as="span" ml="2">
                {draftNoteLoading && <CircularProgress size="0.85rem" isIndeterminate />}
              </Box>
            </Text>
            <Editable
              contentRef={contentRef}
              onPasteHandler={onPasteHandler}
              onInputChange={onInputChange}
              sanitizedHtml={sanitizeHtml(note.content)}
            />
          </VStack>

          <HStack mt="0.9rem !important" w="95%" justifyContent="space-between">
            <DataList
              handleIconChange={handleIconChange}
              icon={icon}
              onChangeHandler={handleChange}
              defaultValue={note.website}
              collections={collections}
              favicon={note.favicon}
            />
            <Tooltip fontFamily="Raleway" fontSize="md" label="set collection & icon">
              <Button
                aria-label="set collection to current url"
                onClick={setUrl}
                colorScheme="bb"
                type="button"
                w="8em"
                variant="outline"
                fontWeight="bold"
              >
                Current URL
              </Button>
            </Tooltip>
          </HStack>
          <HStack mt="0.6rem !important" w="95%" justifyContent="space-between">
            <FormControl w="fit-content" display="flex" alignItems="center">
              <FormLabel htmlFor="is-pinned">Pin :</FormLabel>
              <Switch
                colorScheme="bb"
                name="isPinned"
                onChange={switchHandler}
                isChecked={note.isPinned}
                id="is-pinned"
              />
            </FormControl>
            <Button
              aria-label="reset note"
              onClick={resetNote}
              colorScheme="bb"
              type="button"
              w="8em"
              variant="outline"
              fontWeight="bold"
            >
              Reset
            </Button>
          </HStack>
          <Button
            mt="0.6rem !important"
            isLoading={loading}
            isDisabled={loading}
            type="submit"
            colorScheme="bb"
            w="full"
            h="2.5em"
            variant="outline"
            fontWeight="bold"
          >
            Save
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
export default Sidebar;
