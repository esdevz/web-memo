import React, { useRef, useCallback } from "react";
import {
  Text,
  GridItem,
  useColorModeValue,
  useBoolean,
  useColorMode,
  IconButton,
  HStack,
  Link,
  useToast,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";
import { IoArrowBack } from "react-icons/io5";
import { RiPushpinLine } from "react-icons/ri";
import { INote } from "../../store/types";
import { TiDocumentDelete } from "react-icons/ti";
import useNoteStore from "../../store/noteStore";
import Editable from "./Editable";
import { sanitizeHtml } from "../../../utils/sanitizeHtml";
import { rTime } from "../../../utils/Date";
import NoteContainer from "./NoteContainer";
import { VscGrabber } from "react-icons/vsc";

const Note = ({ note }: NoteProps) => {
  const emColor = useColorModeValue("mediumblue", "lightskyblue");
  const [open, setOpen] = useBoolean(false);
  const [editNote, pin, del, setDraggedNote] = useNoteStore(
    useCallback(
      (state) => [state.edit, state.pin, state.delete, state.setDraggedNote],
      []
    )
  );
  const [loading, setLoading] = useBoolean(false);
  const [drag, setDrag] = useBoolean(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const TitleRef = useRef<HTMLHeadingElement>(null);
  const { colorMode } = useColorMode();
  const toast = useToast();

  const saveNote = async () => {
    let editedNote = {
      ...note,
      createdAt: Date.now(),
      content: sanitizeHtml(contentRef.current?.innerHTML),
      title: TitleRef.current?.textContent ?? "",
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

  const dragStartHandler = () => {
    setDraggedNote(note);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      return;
    } else if (e.code === "Escape") {
      setOpen.off();
    }
  };

  if (note.createdAt === 0) {
    return null;
  }
  return (
    <NoteContainer
      onKeyDown={onKeyDownHandler}
      onDragStart={dragStartHandler}
      onDragEnd={setDrag.off}
      draggable={drag}
      open={open}
      colorMode={colorMode}
    >
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        rowSpan={1}
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
        <Tooltip label={note.title} fontSize="xs">
          <Text
            onClick={setOpen.on}
            cursor={open ? undefined : "pointer"}
            contentEditable={open}
            spellCheck="false"
            _focusVisible={{
              outline: "2px solid rgba(128, 128, 128, 0.34)",
              borderRadius: "4px",
            }}
            ref={TitleRef}
            as="h2"
            isTruncated
            maxW={open ? "80ch" : "230px"}
            w={open ? "50ch" : undefined}
          >
            {note.title}
          </Text>
        </Tooltip>
      </GridItem>
      <Editable
        tabIndex={0}
        isOpen={open}
        sanitizedHtml={sanitizeHtml(note.content)}
        ref={contentRef}
        onClick={setOpen.on}
      />
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        rowSpan={1}
      >
        <HStack spacing="3">
          <Text as="em" fontSize="xs" color={emColor}>
            {rTime(Date.now(), note.createdAt)}
          </Text>
          {open && note.fullUrl && (
            <Link
              maxW="md"
              fontSize="xs"
              fontFamily="Open Sans"
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
          <NoteOptions delete={deleteNote} savingState={loading} save={saveNote} />
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
      <GridItem display="flex" justifyContent="center" rowSpan={1}>
        <Icon
          as={VscGrabber}
          boxSize="5"
          cursor="move"
          onMouseDown={setDrag.on}
          onMouseUp={setDrag.off}
          marginInline="auto"
        />
      </GridItem>
    </NoteContainer>
  );
};

export default Note;

interface NoteProps {
  note: INote;
}
