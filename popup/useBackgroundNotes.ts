import { useCallback, useEffect, useState } from "react";
import Dexie from "dexie";

export interface INote {
  id?: number;
  title: string;
  website: string;
  favicon: string;
  content: string;
  createdAt: number;
  isPinned: boolean;
}

declare global {
  interface Window {
    bgNote: INote;
  }
}

export const initialNoteState: INote = {
  title: "",
  website: "",
  favicon: "",
  content: "",
  createdAt: 0,
  isPinned: false,
};

export function useBackgroundNote() {
  const [note, setNote] = useState(initialNoteState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    browser.runtime
      .getBackgroundPage()
      .then((window) => {
        if (window.bgNote) {
          setNote(window.bgNote);
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, []);

  const saveNote = useCallback(async () => {
    const db = new Dexie("web-notes");
    db.version(1).stores({
      notes: "++id ,title , website ,content,createdAt",
    });
    setLoading(true);
    try {
      await db.table("notes").put(note);
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
  }, [note]);

  return { note, setNote, saveNote, loading };
}
