import Dexie from "dexie";
import { CollectionOptions, Configs, INote } from "../main/store/types";
import { defaultConfig } from "../utils/defaults";

export const DATABASE = "web-notes";
export const NOTES_TABLE = "notes";

const schema = "++id ,title ,website, fullUrl,createdAt",
  configsSchema = "id, tabLayout , collections",
  CONFIGS_TABLE = "configs";
export class NotesDB extends Dexie {
  constructor() {
    super(DATABASE);
    this.version(2).stores({
      notes: schema,
      configs: configsSchema,
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
  updateNote(id: number, newNote: Partial<INote>) {
    return this.table<INote, number>(NOTES_TABLE).update(id, newNote);
  }
  deleteNote(id: number) {
    return this.table<INote, number>(NOTES_TABLE).delete(id);
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
        cfg.collections[name] = { ...(cfg.collections[name] || {}), ...subCollection };
      });
  }
}
