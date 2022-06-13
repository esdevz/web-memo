import { db } from "./db";
import create from "zustand";
import { NoteStore, Layout, CollectionOptions, INote } from "./types";
import produce from "immer";
import { formatCollections } from "../../utils";

const useNoteStore = create<NoteStore>((set, get) => ({
  tabLayout: "default",
  collections: {},
  activeTab: "notes",
  draggedNote: null,
  customFonts: undefined,
  tabs: [],
  setTabs(newOrder: string[]) {
    set((state) => ({
      ...state,
      tabs: newOrder,
    }));
  },
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
          if (Object.keys(collectionProps).length > 0) {
            draft.collections[newNote.website] = {
              ...collectionProps,
            };
            draft.tabs.push(collectionProps.displayName);
          }
        })
      );
    }
  },
  async getConfigs() {
    const cfg = await db.getConfigs();
    const cols = formatCollections(cfg);
    set((state) => ({
      ...state,
      tabLayout: cfg.tabLayout,
      customFonts: cfg.fonts,
      collections: cols,
      tabs: Object.keys(cols),
    }));
  },

  async updateCustomFonts(customFonts) {
    const updates = await db.updateConfigs(1, { fonts: customFonts });
    if (updates) {
      set((state) =>
        produce(state, (draft) => {
          draft.customFonts = customFonts;
        })
      );
      return {
        type: "success",
        message: "saved",
      };
    } else {
      return {
        type: "error",
        message: "an error happened while updating your note",
      };
    }
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
    const updates = await db.updateCollection(website, newCollection);
    if (updates) {
      return {
        type: "success",
        message: "saved",
      };
    } else {
      return {
        type: "error",
        message: "an error happened while updating your collections",
      };
    }
  },
  async deleteNote(note: INote) {
    const feedback = await db.deleteNote(note.id!);
    const notesCount = await db.noteCount(note.website);
    if (notesCount === 0 && note.website !== "notes") {
      db.deleteCollection(note.website);
      set((state) =>
        produce(state, (draft) => {
          draft.activeTab = "notes";
          delete draft.collections[note.website];
          draft.tabs = state.tabs.filter((tab) => tab !== note.website);
          browser.sidebarAction.isOpen({}).then((isOpen) => {
            if (isOpen)
              browser.runtime.sendMessage({
                msg: "DELETE",
                collection: note.website,
              });
          });
        })
      );
    }

    return feedback;
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
      await db.updateNote(draggedNote?.id!, { website: url });
      const count = await db.noteCount(originTab);

      if (count === 0) {
        db.deleteCollection(originTab);
        set((state) =>
          produce(state, (draft) => {
            draft.activeTab = url;
            draft.tabs = state.tabs.filter((tab) => tab !== originTab);
            delete draft.collections[originTab];
            browser.sidebarAction.isOpen({}).then((isOpen) => {
              if (isOpen)
                browser.runtime.sendMessage({
                  msg: "DELETE",
                  collection: originTab,
                });
            });
          })
        );
      }
    }
  },
}));

export default useNoteStore;
