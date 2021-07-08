import {
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  useBoolean,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";

import { INote } from "../../store/types";
import { useState } from "react";
import { useRef } from "react";

const Note = ({ note }: NoteProps) => {
  const emColor = useColorModeValue("mediumblue", "lightskyblue");
  const [open, setOpen] = useBoolean();
  const [editable, setEditable] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const { colorMode } = useColorMode();

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
    >
      <GridItem
        cursor="pointer"
        rowSpan={1}
        maxW={open ? "80%" : "315px"}
        onClick={() => setOpen.toggle()}
      >
        <Text as="h2" isTruncated>
          {note.title}
        </Text>
      </GridItem>

      <GridItem
        overflow={open ? "auto" : "hidden"}
        sx={{ scrollbarWidth: "thin" }}
        noOfLines={open ? undefined : 6}
        whiteSpace="pre-wrap"
        rowSpan={open ? 8 : 2}
        onDoubleClick={() => setEditable(true)}
        contentEditable={editable}
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
          <Button onClick={() => console.log(contentRef.current?.innerText)}>
            log
          </Button>
        ) : (
          <NoteOptions />
        )}
      </GridItem>
    </Grid>
  );
};

export default Note;

interface NoteProps {
  note: INote;
}
