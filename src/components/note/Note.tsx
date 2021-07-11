import {
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  useBoolean,
  useColorMode,
  IconButton,
  HStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";
import { IoArrowBack } from "react-icons/io5";
import { RiPushpinLine } from "react-icons/ri";
import { INote } from "../../store/types";
import { TiDocumentDelete } from "react-icons/ti";
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
  const toast = useToast();

  const saveNote = async () => {
    let editedNote = {
      ...note,
      createdAt: Date.now(),
      content: contentRef.current?.innerText || "...",
      title: TitleRef.current?.innerText || "...",
    };
    setLoading.on();
    const feedback = await editNote(editedNote);
    setLoading.off();
    toast({
      title: feedback.message,
      status: feedback.type,
      duration: 1500,
    });
  };

  const pinNote = async () => {
    const feedback = await pin(note);
    feedback.type === "error" &&
      toast({
        title: feedback.message,
        status: feedback.type,
        duration: 1500,
      });
  };

  const deleteNote = async () => {
    const feedback = await del(note);
    feedback.type === "error" &&
      toast({
        title: feedback.message,
        status: feedback.type,
        duration: 1500,
      });
  };

  if (note.createdAt === 0) {
    return null;
  }
  return (
    <Grid
      pos={open ? "fixed" : "static"}
      w={open ? "69%" : "350px"}
      h={open ? "95%" : "265px"}
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
        maxW={open ? "80%" : "325px"}
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
        cursor={open ? undefined : "pointer"}
        onClick={() => setOpen.on()}
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
        <HStack spacing="3">
          <Text as="em" fontSize="xs" color={emColor}>
            {new Date(note.createdAt).toLocaleString(navigator.language, {
              year: "numeric",
              month: "short",
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
            })}
          </Text>
          {open && note.fullUrl && (
            <Link
              maxW="md"
              fontSize="xs"
              fontFamily="Montserrat"
              isTruncated
              referrerPolicy="no-referrer"
              isExternal
              href={note.fullUrl}
            >
              {note.fullUrl}
            </Link>
          )}
        </HStack>

        {open ? (
          <NoteOptions
            delete={deleteNote}
            savingState={loading}
            save={saveNote}
          />
        ) : (
          <HStack spacing="1">
            <IconButton
              size="sm"
              colorScheme="darkpink"
              icon={<TiDocumentDelete />}
              aria-label="delete"
              onClick={deleteNote}
            />
            <IconButton
              size="sm"
              colorScheme={note.isPinned ? "yellow" : "gray"}
              icon={<RiPushpinLine />}
              aria-label="pin"
              onClick={pinNote}
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
