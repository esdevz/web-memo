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
import { INote } from "../../store/types";
import useNoteStore from "../../store/noteStore";
import Editable from "./Editable";
import { sanitizeHtml } from "../../../utils/sanitizeHtml";
import { rTime } from "../../../utils/Date";
import NoteContainer from "./NoteContainer";
import { VscGrabber } from "react-icons/vsc";
import NoteTools from "./NoteTools";
import Colors from "./Colors";
import shallow from "zustand/shallow";
import { useEditor } from "../../../editor/useEditor";
import Tools from "../../../editor/Tools";

interface NoteProps {
  note: INote;
}

const Note = ({ note }: NoteProps) => {
  const emColor = useColorModeValue("mediumblue", "lightskyblue");
  const [open, setOpen] = useBoolean(false);
  const [editNote, pin, del, setDraggedNote, setNoteColor] = useNoteStore(
    useCallback(
      (state) => [
        state.edit,
        state.pin,
        state.delete,
        state.setDraggedNote,
        state.setNoteColor,
      ],
      []
    ),
    shallow
  );
  const [loading, setLoading] = useBoolean(false);
  const [drag, setDrag] = useBoolean(false);
  const closeNoteRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const TitleRef = useRef<HTMLHeadingElement>(null);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { onRefChange, editor, onPasteCaptureHandler, onDropHandler } = useEditor(
    note.content
  );

  const saveNote = async () => {
    let editedNote = {
      ...note,
      createdAt: Date.now(),
      content: sanitizeHtml(editor?.getContent()),
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

  const openNoteHandler = () => {
    if (!open) {
      setOpen.on();
      setTimeout(() => closeNoteRef.current?.focus(), 0);
    }
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      switch (e.code) {
        case "Space":
        case "Enter":
          setOpen.on();
          break;
        default:
          break;
      }
    }
    if (open) {
      switch (e.key) {
        case "Escape":
          setOpen.off();
          contentRef.current?.blur();
          break;
        case e.ctrlKey && "s":
          e.preventDefault();
          saveNote();
          break;
        case "Delete":
          deleteNote();
          break;
        default:
          break;
      }
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
      noteColor={note.colorScheme}
    >
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        rowSpan={1}
      >
        {open && (
          <IconButton
            ref={closeNoteRef}
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
            onClick={openNoteHandler}
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
            maxW={open ? "80ch" : "18rem"}
            w={open ? "50ch" : undefined}
          >
            {note.title}
          </Text>
        </Tooltip>
      </GridItem>
      {open && <Tools editor={editor} />}
      <Editable
        isOpen={open}
        onPasteCapture={onPasteCaptureHandler}
        onDrop={onDropHandler}
        sanitizedHtml={sanitizeHtml(note.content)}
        ref={onRefChange}
        onClick={openNoteHandler}
      />
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        rowSpan={1}
      >
        <HStack spacing="3">
          {open && (
            <Colors
              setNoteColor={setNoteColor}
              noteId={note.id!}
              website={note.website}
            />
          )}
          <Text as="em" fontSize="xs" color={emColor}>
            {rTime(Date.now(), note.createdAt, open)}
          </Text>
          {open && note.fullUrl && (
            <Link
              maxW="sm"
              fontSize="xs"
              fontFamily="body"
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
          <NoteTools
            setNoteColor={setNoteColor}
            id={note.id!}
            website={note.website}
            deleteNote={deleteNote}
            pinNote={pinNote}
            isPinned={note.isPinned}
          />
        )}
      </GridItem>
      <GridItem display="flex" justifyContent="center" rowSpan={1}>
        <Icon
          as={VscGrabber}
          boxSize="5"
          cursor="grab"
          onMouseDown={setDrag.on}
          onMouseUp={setDrag.off}
          marginInline="auto"
        />
      </GridItem>
    </NoteContainer>
  );
};

export default Note;
