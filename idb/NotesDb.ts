import Dexie from "dexie";
import {
  CollectionOptions,
  Configs,
  INote,
  NotificationMessage,
} from "../main/store/types";
import { defaultConfig, defaultNote } from "../utils/defaults";

export const DATABASE = "web-notes";
export const NOTES_TABLE = "notes";

const updatingMsg = "an error occured while trying to save your note";
const deletingMsg = "an error occured while trying to delete your note";

const schema = "++id ,title ,website, fullUrl,createdAt",
  configsSchema = "id, tabLayout , collections",
  CONFIGS_TABLE = "configs";
export class NotesDB extends Dexie {
  constructor() {
    super(DATABASE);
    this.version(2)
      .stores({
        notes: schema,
        configs: configsSchema,
      })
      .upgrade(async (tx) => {
        const notes = await tx.table<INote, number>(NOTES_TABLE).toArray();
        const configs = notes.concat(defaultNote).reduce(
          (cfg: Configs, note) => {
            cfg.collections[note.website] = {
              displayName: note.website,
              customIconType: "default",
              favicon: note.favicon || "",
            };
            return cfg;
          },
          {
            id: 1,
            tabLayout: "default",
            collections: {},
          }
        );
        tx.table(CONFIGS_TABLE).put(configs);
      });
  }

  putNote(note: INote) {
    return this.table<INote, number>(NOTES_TABLE).put(note);
  }
  getLastNote() {
    return this.table<INote, number>(NOTES_TABLE).toCollection().last();
  }
  getNotes() {
    return this.table<INote, number>(NOTES_TABLE).orderBy("createdAt").toArray();
  }
  getNotesByWebsite(collectionName: string) {
    return this.table<INote, number>(NOTES_TABLE)
      .where("website")
      .equals(collectionName)
      .reverse()
      .sortBy("createdAt");
  }
  filterNotes(search: string) {
    return this.table<INote, number>(NOTES_TABLE)
      .filter((note) => {
        if (search.length < 3) {
          return false;
        }
        return (
          note.content.toLowerCase().includes(search.toLowerCase()) ||
          note.title.toLowerCase().includes(search.toLowerCase())
        );
      })
      .reverse()
      .sortBy("createdAt");
  }
  async updateNote(
    id: number,
    newNote: Partial<INote>
  ): Promise<NotificationMessage> {
    let updates = await this.table<INote, number>(NOTES_TABLE).update(id, newNote);
    if (updates) {
      return {
        type: "success",
        message: "saved",
      };
    } else {
      return {
        type: "error",
        message: updatingMsg,
      };
    }
  }

  noteCount(url: string) {
    return this.table<INote, number>(NOTES_TABLE)
      .where("website")
      .equals(url)
      .count();
  }

  async deleteNote(id: number): Promise<NotificationMessage> {
    try {
      await this.table<INote, number>(NOTES_TABLE).delete(id);
      return {
        type: "info",
        message: "deleted",
      };
    } catch (err) {
      console.error(err);
      return {
        type: "error",
        message: deletingMsg,
      };
    }
  }

  async getConfigs() {
    const configs = await this.table<Configs, number>(CONFIGS_TABLE)
      .toCollection()
      .first();
    if (!configs) {
      await this.table<Configs>(CONFIGS_TABLE).put(defaultConfig, 1);
      return defaultConfig;
    }
    return configs;
  }

  updateConfigs(id: number, cfg: Partial<Configs>) {
    return this.table<Configs, number>(CONFIGS_TABLE).update(id, cfg);
  }

  deleteCollection(name: string) {
    return this.table<Configs, number>(CONFIGS_TABLE)
      .toCollection()
      .modify((cfg) => {
        delete cfg.collections[name];
      });
  }

  async updateCollections(collections: string[]) {
    return this.table<Configs, number>(CONFIGS_TABLE)
      .toCollection()
      .modify((cfg) => {
        const newCollections: Record<string, CollectionOptions> = {};
        for (const [idx, col] of collections.entries()) {
          newCollections[col] = {
            ...cfg.collections[col],
            order: idx,
          };
        }
        cfg.collections = newCollections;
      });
  }

  updateCollection(name: string, subCollection: Partial<CollectionOptions>) {
    if (Object.keys(subCollection).length === 0) {
      return Promise.resolve(0);
    }
    return this.table<Configs, number>(CONFIGS_TABLE)
      .toCollection()
      .modify((cfg) => {
        cfg.collections[name] = {
          ...(cfg.collections[name] || {}),
          ...subCollection,
        };
      });
  }
}
