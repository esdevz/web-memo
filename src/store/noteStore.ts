import create from "zustand";
import { NotesDB } from "../idb/NotesDb";
import { NoteStore } from "./types";
import { INote } from "./types";

const db = new NotesDB();
const DB_NAME = "notes";
const updatingError = "an error happened while updating your note";

export const defaultState = (
  notes: Record<string, INote[]>,
  activeTab: string
): boolean => {
  const initialState =
    Object.keys(notes).length === 1 && notes[DB_NAME].length === 1;
  const emptyNotesCollection =
    notes[DB_NAME].length === 1 && activeTab === DB_NAME;
  return initialState || emptyNotesCollection;
};

const defaultNote = {
  title: "",
  content: "",
  fullUrl: "",
  createdAt: 0,
  favicon: "",
  isPinned: false,
  website: "notes",
};

const formatNotes = (noteArray: INote[]): Record<string, INote[]> => {
  return noteArray.reduce(
    (notes: Record<string, INote[]>, currentNote) => {
      notes[currentNote.website] = [
        currentNote,
        ...(notes[currentNote.website] || []),
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
  async addNewNote() {
    const newNote = await db.getLastNote();
    if (newNote) {
      set((state) => {
        let newCollection = [newNote, ...(state.notes[newNote.website] || [])];
        return {
          ...state,
          notes: {
            ...state.notes,
            [newNote.website]: newCollection,
          },
        };
      });
    }
  },
  async getNotes() {
    const fetchedNotes = await db.getNotes();

    set((state) => ({
      ...state,
      notes: formatNotes(fetchedNotes),
    }));
  },
  async edit(newNote) {
    const updates = await db.updateNote(newNote.id!, newNote);
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
      return {
        type: "success",
        message: "saved",
      };
    } else {
      return {
        type: "error",
        message: updatingError,
      };
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
    try {
      await db.deleteNote(note.id!);
      return {
        type: "success",
        message: "deleted",
      };
    } catch (err) {
      console.log(err);
      return {
        type: "error",
        message: "an error happened while deleting",
      };
    }
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
    const updates = await db.updateNote(note.id!, { isPinned: !note.isPinned });
    if (!updates) {
      return {
        type: "error",
        message: updatingError,
      };
    }
    return {
      type: "success",
      message: `${note.isPinned ? "Unpinned" : "Pinned"}`,
    };
  },
}));

export default useNoteStore;
