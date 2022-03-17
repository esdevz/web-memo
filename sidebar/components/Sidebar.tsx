import React, { ChangeEvent, FormEvent, useState } from "react";
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
import { useEditor } from "../../editor/useEditor";
import Tools from "../../editor/Tools";

const port = chrome.runtime.connect({ name: "popup" });

const Sidebar = () => {
  const { note, setNote, saveNote, loading, collections, draftNoteLoading } =
    useBackgroundNote();
  const [icon, setIcon] = useState<CustomIcon>("default");
  const { editor, onRefChange, keyDownHandler, onBlurHandler } = useEditor(
    note.content
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const changes = {
      favicon: e.target.name === "website" ? "" : note.favicon,
      [e.target.name]: e.target.value,
      createdAt: Date.now(),
    };
    const newNote = {
      ...note,
      ...changes,
    };
    setNote(newNote);
    port.postMessage({ msg: "EDITING", changes });
  };
  const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [e.target.name]: e.target.checked,
    });
    port.postMessage({
      msg: "EDITING",
      changes: { isPinned: e.target.checked, createdAt: Date.now() },
    });
  };

  const setUrl = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
    });
    if (tab.url) {
      const changes = {
        favicon: tab.favIconUrl || "",
        fullUrl: tab.url,
        website: getHostName(tab.url),
        title: tab.title || note.title,
        createdAt: Date.now(),
      };
      const newNote = {
        ...note,
        ...changes,
      };

      setNote(newNote);
      port.postMessage({ msg: "EDITING", changes });
    }
  };
  const resetNote = () => {
    setNote(initialNoteState);
    port.postMessage({ msg: "RESET" });
    if (editor) {
      editor.setContent("");
    }
  };

  const handleIconChange = (option: CustomIcon) => {
    setIcon(option);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newNote = {
      ...note,
      content: sanitizeHtml(editor?.getContent()),
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

  return (
    <Box as="main" minW="33em" w="35em">
      <VStack h="100%" w="100%" spacing="1.5">
        <Button
          h="2.7em"
          w="full"
          borderRadius="0"
          colorScheme="bb"
          variant="outline"
          size="sm"
          onClick={openNotes}
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
            fontSize="sm"
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
                {draftNoteLoading && (
                  <CircularProgress size="0.85rem" isIndeterminate />
                )}
              </Box>
            </Text>
            <Tools editor={editor} port={port} fontSize="0.9rem" size="sm" />
            <Editable
              port={port}
              editor={editor}
              ref={onRefChange}
              sanitizer={sanitizeHtml}
              onBlur={onBlurHandler}
              onKeyDown={keyDownHandler}
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
            <Tooltip
              fontFamily="Raleway"
              fontSize="sm"
              label="set collection & icon"
            >
              <Button
                aria-label="set collection to current url"
                onClick={setUrl}
                colorScheme="bb"
                type="button"
                w="8em"
                variant="outline"
                size="sm"
              >
                Current URL
              </Button>
            </Tooltip>
          </HStack>
          <HStack mt="0.6rem !important" w="95%" justifyContent="space-between">
            <FormControl w="fit-content" display="flex" alignItems="center">
              <FormLabel fontSize="sm" htmlFor="is-pinned">
                Pin :
              </FormLabel>
              <Switch
                colorScheme="bb"
                name="isPinned"
                onChange={switchHandler}
                isChecked={note.isPinned}
                id="is-pinned"
              />
            </FormControl>
            <Button
              size="sm"
              aria-label="reset note"
              onClick={resetNote}
              colorScheme="bb"
              type="button"
              w="8em"
              variant="outline"
            >
              Reset
            </Button>
          </HStack>
          <Button
            size="sm"
            mt="0.6rem !important"
            isLoading={loading}
            isDisabled={loading}
            type="submit"
            colorScheme="bb"
            w="full"
            h="2.5em"
            variant="outline"
          >
            Save
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
export default Sidebar;
