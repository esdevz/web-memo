import { useColorMode } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { NotesDB } from "../../src/idb/NotesDb";
import { INote } from "../../src/store/types";

const db = new NotesDB();

export const initialNoteState: INote = {
  title: "",
  website: "notes",
  fullUrl: "",
  favicon: "",
  content: "",
  createdAt: 0,
  isPinned: false,
};

export function useBackgroundNote() {
  const [note, setNote] = useState(initialNoteState);
  const [loading, setLoading] = useState(false);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const sending = browser.runtime.sendMessage({
      msg: "GET_NOTE",
    });
    sending.then(
      (backgroundNote: INote) => {
        if (backgroundNote.createdAt === 0) {
          return;
        }
        setNote(backgroundNote);
      },
      (err) => {
        console.log(err);
      }
    );
    const onMessageHandler = (request: { msg: string; note?: INote }) => {
      if (request.msg === "EDIT_NOTE" && request.note) {
        setNote((currentNote) => ({
          ...currentNote,
          content: currentNote.content.concat(
            "\n",
            request.note?.content || ""
          ),
        }));
      }
      if (request.msg === "TOGGLE_COLOR_MODE") {
        toggleColorMode();
      }
    };
    browser.runtime.onMessage.addListener(onMessageHandler);

    return () => browser.runtime.onMessage.removeListener(onMessageHandler);
  }, [toggleColorMode]);

  const saveNote = useCallback(async (newNote: INote) => {
    setLoading(true);
    try {
      await db.putNote(newNote);
      setLoading(false);
      return {
        msg: "note saved",
        state: true,
      };
    } catch (err) {
      console.log(err);
      setLoading(false);
      return {
        msg: "an error occured",
        state: false,
      };
    }
  }, []);

  return { note, setNote, saveNote, loading };
}
