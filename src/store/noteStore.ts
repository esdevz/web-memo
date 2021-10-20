import { db } from "./db";
import create from "zustand";
import { NoteStore, Layout, CollectionOptions, INote } from "./types";
import { formatNotes, defaultConfig } from "../../utils";
import produce from "immer";

const updatingError = "an error happened while updating your note";

const useNoteStore = create<NoteStore>((set, get) => ({
  tabLayout: "default",
  collections: {},
  activeTab: "notes",
  draggedNote: null,
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
    set((state) =>
      produce(state, (draft) => {
        const index = draft.collections[note.website].notes.findIndex(
          (n) => n.id === note.id
        );
        if (index !== -1) {
          draft.collections[note.website].notes.splice(index, 1);
          if (draft.collections[note.website].notes.length === 0) {
            draft.activeTab = "notes";
            delete draft.collections[note.website];
            db.deleteCollection(note.website);
          }
        }
      })
    );
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
    set((state) =>
      produce(state, (draft) => {
        const findNote = draft.collections[note.website].notes.find(
          (n) => n.id === note.id
        );
        if (findNote) findNote.isPinned = !findNote.isPinned;
      })
    );
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
    await db.updateConfigs(1, { tabLayout });
  },
  async updateCollection(website: string, newCollection: CollectionOptions) {
    set((state) =>
      produce(state, (draft) => {
        draft.collections[website].customIconType = newCollection.customIconType;
        draft.collections[website].displayName = newCollection.displayName;
        draft.collections[website].favicon = newCollection.favicon;
      })
    );
    db.updateCollection(website, newCollection);
  },
  setDraggedNote(note: INote) {
    set((state) =>
      produce(state, (draft) => {
        draft.draggedNote = note;
      })
    );
  },
  async updateTagetCollection(url) {
    let draggedNote = get().draggedNote;
    let originTab = get().activeTab;

    if (draggedNote) {
      return set((state) =>
        produce(state, (draft) => {
          draft.collections[url].notes.unshift(draggedNote!);
          draft.collections[originTab].notes.splice(
            draft.collections[originTab].notes.findIndex((n) => n.id === draggedNote?.id),
            1
          );
          db.updateNote(draggedNote?.id!, { website: url });
          if (draft.collections[originTab].notes.length === 0) {
            db.deleteCollection(originTab);
            draft.activeTab = url;
            delete draft.collections[originTab];
          }
        })
      );
    }
  },
}));

export default useNoteStore;
