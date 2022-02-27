import { db } from "./db";
import create from "zustand";
import { NoteStore, Layout, CollectionOptions, INote } from "./types";
import { formatNotes } from "../../utils";
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
      set((state) =>
        produce(state, (draft) => {
          const currentNotes = draft.collections[newNote.website]?.notes || [];

          if (Object.keys(collectionProps).length > 0) {
            draft.collections[newNote.website] = {
              ...collectionProps,
              notes: currentNotes,
            };
          }
          draft.collections[newNote.website].notes.unshift(newNote);
        })
      );
    }
  },
  async getNotes() {
    const [cfg, fetchedNotes] = await Promise.all([db.getConfigs(), db.getNotes()]);
    set((state) => ({
      ...state,
      tabLayout: cfg.tabLayout,
      collections: formatNotes(fetchedNotes, cfg),
    }));
  },

  async edit(newNote) {
    const updates = await db.updateNote(newNote.id!, newNote);
    if (updates) {
      set((state) =>
        produce(state, (draft) => {
          draft.collections[newNote.website].notes = draft.collections[
            newNote.website
          ].notes.map((note) => (note.id === newNote.id ? newNote : note));
        })
      );
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
  async setNoteColor(id, clr, website) {
    const updates = await db.updateNote(id, { colorScheme: clr });
    if (updates) {
      set((state) =>
        produce(state, (draft) => {
          const noteIdx = draft.collections[website].notes.findIndex(
            (note) => note.id === id
          );
          if (noteIdx !== -1) {
            draft.collections[website].notes[noteIdx].colorScheme = clr;
          }
        })
      );
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
            const views = chrome.extension.getViews({ type: "popup" });
            if (views.length > 0) {
              chrome.runtime.sendMessage({ msg: "DELETE", collection: note.website });
            }
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
  async updateTargetCollection(url) {
    const draggedNote = get().draggedNote;
    const originTab = get().activeTab;

    if (draggedNote) {
      return set((state) =>
        produce(state, (draft) => {
          const index = draft.collections[originTab].notes.findIndex(
            (n) => n.id === draggedNote?.id
          );
          if (index !== -1) {
            draft.collections[url].notes.unshift({ ...draggedNote!, website: url });
            draft.collections[originTab].notes.splice(index, 1);
            db.updateNote(draggedNote?.id!, { website: url });

            if (draft.collections[originTab].notes.length === 0) {
              db.deleteCollection(originTab);
              draft.activeTab = url;
              delete draft.collections[originTab];
              const views = chrome.extension.getViews({ type: "popup" });
              if (views.length > 0) {
                chrome.runtime.sendMessage({ msg: "DELETE", collection: originTab });
              }
            }
          }
        })
      );
    }
  },
}));

export default useNoteStore;
