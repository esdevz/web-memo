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
  const [collections, setUserCollections] = useState(["notes"]);
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
        setNote(request.note);
      }
      if (request.msg === "TOGGLE_COLOR_MODE") {
        toggleColorMode();
      }
    };
    browser.runtime.onMessage.addListener(onMessageHandler);

    return () => browser.runtime.onMessage.removeListener(onMessageHandler);
  }, [toggleColorMode]);

  useEffect(() => {
    db.getNotes().then((col) => {
      const userCollections = col.reduce(
        (res: string[], note) => {
          if (!note.favicon && !res.includes(note.website)) {
            res.push(note.website);
          }
          return res;
        },
        ["notes"]
      );
      setUserCollections(userCollections);
    });
  }, []);

  const saveNote = useCallback(async (newNote: INote) => {
    setLoading(true);
    try {
      await db.putNote(newNote);
      setLoading(false);
      setUserCollections((currentCollection) => {
        if (currentCollection.includes(newNote.website) || newNote.favicon) {
          return currentCollection;
        }
        return currentCollection.concat(newNote.website);
      });
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

  return { note, setNote, saveNote, loading, collections };
}
