import { ChangeEvent, FormEvent, useState } from "react";
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
} from "@chakra-ui/react";
import FormInput from "../../ui/form/FormInput";
import DataList from "../../ui/form/DataList";
import Editable from "./Editable";
import { useBackgroundNote } from "../hooks/useBackgroundNotes";
import { defaultNote as initialNoteState } from "../../consts";
import { getHostName } from "../../utils/getHostName";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { CustomIcon } from "../../main/store/types";
import { useEditor } from "../../editor/useEditor";
import Tools from "../../editor/Tools";
import { Clear, OpenInNewTab, Save, SaveTabs } from "../../ui/icons";

const Sidebar = () => {
  const { note, setNote, saveNote, loading, collections, customFonts } =
    useBackgroundNote();
  const [icon, setIcon] = useState<CustomIcon>("default");

  const { onRefChange, editor, onBlurHandler, keyDownHandler } = useEditor("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({
      ...note,
      favicon: e.target.name === "website" ? "" : note.favicon,
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

    const existingCollection = collections.includes(newNote.website);
    const collectionProps = existingCollection
      ? {}
      : {
          displayName: newNote.website,
          customIconType: icon,
          favicon: newNote.favicon,
        };
    browser.runtime.sendMessage({ msg: "NEW_NOTE", collectionProps });
    resetNote();
  };

  const openNotes = () => {
    browser.tabs.create({
      url: browser.runtime.getURL("main/index.html"),
      active: true,
    });
  };

  //add ctrl + s -> save note
  //add ctrt + r -> reset
  //add ctrl + o -> open notes tab
  //

  return (
    <Box as="main" minH="300px" minW="320px" w="full">
      <VStack h="100%" w="100%" spacing="1.5">
        <HStack
          p="1.5"
          w="full"
          borderBottom="var(--bg-border)"
          alignItems="center"
          gap="1"
        >
          <OpenInNewTab cb={openNotes} />
          <Save loading={loading} />
          <Clear aria-label="reset form" onClick={resetNote} />
          <SaveTabs />
        </HStack>

        <VStack
          as="form"
          id="note-form"
          onSubmit={handleSubmit}
          w="full"
          h="full"
          spacing="1.5"
          p="3"
        >
          <FormInput
            w="95%"
            label="Title :"
            inputProps={{
              w: "full",
              type: "text",
              name: "title",
              value: note.title,
              onChange: handleChange,
              placeholder: "Title",
            }}
          />
          <VStack spacing="1" align="flex-start" h="35rem" w="95%">
            <Text as="h3">Content :</Text>
            <Tools fontSize="1.1rem" size="md" editor={editor} fonts={customFonts} />
            <Editable
              ref={onRefChange}
              onBlur={onBlurHandler}
              onKeyDown={keyDownHandler}
              customFonts={customFonts}
              fontFamily={customFonts.body}
              fontSize="1.1rem"
            />
          </VStack>

          <HStack mt="1rem !important" w="95%" justifyContent="space-between">
            <DataList
              handleIconChange={handleIconChange}
              icon={icon}
              onChangeHandler={handleChange}
              defaultValue={note.website}
              collections={collections}
              favicon={note.favicon}
            />
            <Tooltip
              fontFamily="Raleway Variable"
              fontSize="0.9em"
              label="set collection & icon"
            >
              <Button
                aria-label="set collection to current url"
                onClick={setUrl}
                colorScheme="bb"
                variant="outline"
                type="button"
                w="13ch"
              >
                <Text as="h3"> Current URL</Text>
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
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
export default Sidebar;
