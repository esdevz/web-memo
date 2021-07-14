import { useCallback, useEffect, useState } from "react";
import Dexie from "dexie";
import { INote } from "../src/store/types";

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

  useEffect(() => {
    const sending = browser.runtime.sendMessage({
      msg: "GET_NOTE",
    });
    sending.then(
      (backgroundNote: INote) => {
        setNote(backgroundNote);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const saveNote = useCallback(async (newNote: INote) => {
    const db = new Dexie("web-notes");
    db.version(1).stores({
      notes: "++id ,title ,website, fullUrl,createdAt",
    });
    setLoading(true);
    try {
      await db.table("notes").put(newNote);
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
