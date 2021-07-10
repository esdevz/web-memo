import create from "zustand";
import { NoteStore } from "./types";
import Dexie from "dexie";
import { INote } from "../../popup/useBackgroundNotes";

const DB_NAME = "notes";
const db = new Dexie("web-notes");
db.version(1).stores({
  notes: "++id ,title,website ,content,createdAt",
});

const defaultNote = {
  title: "",
  content: "",
  createdAt: 0,
  favicon: "",
  isPinned: false,
  website: "notes",
};

const formatNotes = (noteArray: INote[]): Record<string, INote[]> => {
  return noteArray.reduce(
    (notes: Record<string, INote[]>, currentNote) => {
      notes[currentNote.website] = [
        ...(notes[currentNote.website] || []),
        currentNote,
      ];
      return notes;
    },
    {
      notes: [defaultNote],
    }
  );
};

const useNoteStore = create<NoteStore>((set) => ({
  notes: {},
  activeTab: "notes",
  setActiveTab(url) {
    set((state) => ({
      ...state,
      activeTab: url,
    }));
  },
  async getNotes() {
    const fetchedNotes = await db.table<INote, number>("notes").toArray();
    set((state) => ({
      ...state,
      notes: formatNotes(fetchedNotes),
    }));
  },
  async edit(newNote) {
    const updates = await db.table(DB_NAME).update(newNote.id, newNote);
    if (updates) {
      set((state) => ({
        ...state,
        notes: {
          ...state.notes,
          [newNote.website]: state.notes[newNote.website].map((note) =>
            note.id === newNote.id ? newNote : note
          ),
        },
      }));
      return "note updated";
    } else {
      return "couldn't update note";
    }
  },
  async delete(note) {
    set((state) => {
      let newCollection = state.notes[note.website].filter(
        (n) => n.id !== note.id
      );
      if (newCollection.length === 0) {
        delete state.notes[note.website];
        return {
          ...state,
          activeTab: "notes",
        };
      } else {
        return {
          ...state,
          notes: {
            ...state.notes,
            [note.website]: newCollection,
          },
        };
      }
    });
    await db.table(DB_NAME).delete(note.id!);
  },
  async pin(note) {
    set((state) => ({
      ...state,
      notes: {
        ...state.notes,
        [note.website]: state.notes[note.website].map((n) =>
          n.id === note.id ? { ...n, isPinned: !n.isPinned } : n
        ),
      },
    }));
    await db
      .table(DB_NAME)
      .update(note.id, { ...note, isPinned: !note.isPinned });
  },
}));

export default useNoteStore;
