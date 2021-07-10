import {
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  useBoolean,
  useColorMode,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";
import { IoOpen, IoArrowBack } from "react-icons/io5";
import { RiPushpinLine } from "react-icons/ri";
import { INote } from "../../store/types";

import { useRef } from "react";
import useNoteStore from "../../store/noteStore";

const Note = ({ note }: NoteProps) => {
  const emColor = useColorModeValue("mediumblue", "lightskyblue");
  const [open, setOpen] = useBoolean(false);
  const [editNote, pin, del] = useNoteStore((state) => [
    state.edit,
    state.pin,
    state.delete,
  ]);
  const [loading, setLoading] = useBoolean(false);

  const contentRef = useRef<HTMLParagraphElement>(null);
  const TitleRef = useRef<HTMLHeadingElement>(null);
  const { colorMode } = useColorMode();

  const saveNote = async () => {
    let editedNote = {
      ...note,
      createdAt: Date.now(),
      content: contentRef.current?.innerText || "...",
      title: TitleRef.current?.innerText || "Empty note",
    };
    setLoading.on();
    await editNote(editedNote);
    setLoading.off();
  };

  const pinNote = async () => {
    await pin(note);
  };

  const deleteNote = async () => {
    await del(note);
  };

  if (note.createdAt === 0) {
    return null;
  }
  return (
    <Grid
      pos={open ? "fixed" : "static"}
      w={open ? "69%" : "340px"}
      h={open ? "95%" : "255px"}
      top={open ? 0 : undefined}
      p="2.5"
      as="article"
      shadow="md"
      templateRows={`repeat(${open ? 10 : 4},1fr )`}
      templateColumns="repeat(1, 1fr)"
      gap={2}
      m="1"
      border="1px solid rgba(128, 128, 128, 0.34)"
      transition="all 0.2s ease-in-out"
      zIndex={open ? 2 : undefined}
      bgColor={colorMode === "dark" ? "gray.800" : "white"}
    >
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        rowSpan={1}
        maxW={open ? "80%" : "315px"}
      >
        {open && (
          <IconButton
            colorScheme="messenger"
            size="sm"
            onClick={setOpen.off}
            aria-label="back"
            icon={<IoArrowBack />}
            mr="1"
          />
        )}
        <Text
          contentEditable={open}
          spellCheck="false"
          outline="0px solid transparent"
          ref={TitleRef}
          as="h2"
          isTruncated
        >
          {note.title}
        </Text>
      </GridItem>

      <GridItem
        overflow={open ? "auto" : "hidden"}
        sx={{ scrollbarWidth: "thin" }}
        noOfLines={open ? undefined : 6}
        whiteSpace="pre-wrap"
        rowSpan={open ? 8 : 2}
      >
        <Text
          contentEditable={open}
          spellCheck="false"
          outline="0px solid transparent"
          ref={contentRef}
          maxW="75ch"
        >
          {note.content}
        </Text>
      </GridItem>

      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        rowSpan={1}
      >
        <Text as="em" fontSize="xs" color={emColor}>
          {new Date(note.createdAt).toLocaleString(navigator.language, {
            year: "numeric",
            month: "short",
            weekday: "short",
            hour: "numeric",
            minute: "2-digit",
          })}
        </Text>
        {open ? (
          <NoteOptions
            delete={deleteNote}
            savingState={loading}
            save={saveNote}
          />
        ) : (
          <HStack spacing="0.5">
            <IconButton
              size="sm"
              colorScheme={note.isPinned ? "yellow" : "gray"}
              icon={<RiPushpinLine />}
              aria-label="pin"
              onClick={pinNote}
            />
            <IconButton
              size="sm"
              colorScheme="messenger"
              icon={<IoOpen />}
              aria-label="open"
              onClick={() => setOpen.on()}
            />
          </HStack>
        )}
      </GridItem>
    </Grid>
  );
};

export default Note;

interface NoteProps {
  note: INote;
}
