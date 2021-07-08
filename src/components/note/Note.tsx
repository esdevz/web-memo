import {
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  useBoolean,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";
import { IoOpen, IoArrowBack } from "react-icons/io5";
import { INote } from "../../store/types";

import { useRef } from "react";
import useNoteStore from "../../store/noteStore";

const Note = ({ note }: NoteProps) => {
  const emColor = useColorModeValue("mediumblue", "lightskyblue");
  const [open, setOpen] = useBoolean();
  const [editNote] = useNoteStore((state) => [state.edit]);

  const contentRef = useRef<HTMLParagraphElement>(null);
  const TitleRef = useRef<HTMLHeadingElement>(null);
  const { colorMode } = useColorMode();

  const saveNote = () => {
    let editedNote = {
      ...note,
      createdAt: Date.now(),
      content: contentRef.current?.innerText || "...",
      title: TitleRef.current?.innerText || "Empty note",
    };
    editNote(editedNote);
  };

  if (note.createdAt === 0) {
    return null;
  }
  return (
    <Grid
      pos={open ? "absolute" : "static"}
      w={open ? "88%" : "340px"}
      h={open ? "95%" : "255px"}
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
      contentEditable={open}
      spellCheck="false"
      outline="0px solid transparent"
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
        <Text ref={TitleRef} as="h2" isTruncated>
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
        <Text ref={contentRef} maxW="75ch">
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
          <NoteOptions save={saveNote} />
        ) : (
          <IconButton
            size="sm"
            colorScheme="messenger"
            icon={<IoOpen />}
            aria-label="open"
            onClick={() => setOpen.on()}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default Note;

interface NoteProps {
  note: INote;
}
