import { db } from "./db";
import create from "zustand";
import { NoteStore, Layout, CollectionOptions } from "./types";
import { formatNotes, defaultConfig } from "../../utils";
import produce from "immer";

const updatingError = "an error happened while updating your note";

const useNoteStore = create<NoteStore>((set) => ({
  tabLayout: "default",
  collections: {},
  activeTab: "notes",
  setActiveTab(url) {
    set((state) => ({
      ...state,
      activeTab: url,
    }));
  },
  async addNewNote(collectionProps) {
    const newNote = await db.getLastNote();

    if (newNote) {
      set((state) => {
        let newCollection = [
          newNote,
          ...(state.collections[newNote.website]?.notes || []),
        ];
        return {
          ...state,
          collections: {
            ...state.collections,
            [newNote.website]: {
              ...collectionProps,
              notes: newCollection,
            },
          },
        };
      });
    }
  },
  async getNotes() {
    const [cfg, fetchedNotes] = await Promise.all([db.getConfigs(), db.getNotes()]);

    set((state) => ({
      ...state,
      tabLayout: cfg?.tabLayout || "default",
      collections: formatNotes(fetchedNotes, cfg || defaultConfig),
    }));
  },

  async edit(newNote) {
    const updates = await db.updateNote(newNote.id!, newNote);
    if (updates) {
      set((state) => ({
        ...state,
        collections: {
          ...state.collections,
          [newNote.website]: {
            ...state.collections[newNote.website],
            notes: state.collections[newNote.website].notes.map((note) =>
              note.id === newNote.id ? newNote : note
            ),
          },
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
      let newNotes = state.collections[note.website].notes.filter(
        (n) => n.id !== note.id
      );
      if (newNotes.length === 0) {
        delete state.collections[note.website];
        db.deleteCollection(note.website);
        return {
          ...state,
          activeTab: "notes",
        };
      } else {
        return {
          ...state,
          collections: {
            ...state.collections,
            [note.website]: {
              ...state.collections[note.website],
              notes: newNotes,
            },
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
      collections: {
        ...state.collections,
        [note.website]: {
          ...state.collections[note.website],
          notes: state.collections[note.website].notes.map((n) =>
            n.id === note.id ? { ...n, isPinned: !n.isPinned } : n
          ),
        },
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
  async updateLayout(tabLayout: Layout) {
    set((state) => ({
      ...state,
      tabLayout,
    }));
    db.updateConfigs(1, { tabLayout });
  },
  async updateCollection(website: string, newCollection: CollectionOptions) {
    set((state) =>
      produce(state, (draft) => {
        draft.collections[website].customIconType = newCollection.customIconType;
        draft.collections[website].displayName = newCollection.displayName;
      })
    );
    db.updateCollection(website, newCollection);
  },
}));

export default useNoteStore;
