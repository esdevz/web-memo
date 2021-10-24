import Dexie from "dexie";
import { CollectionOptions, Configs, INote } from "../src/store/types";
import { defaultNote } from "../utils";

const schema = "++id ,title ,website, fullUrl,createdAt",
  configsSchema = "id, tabLayout , collections",
  CONFIGS_TABLE = "configs",
  NOTES_TABLE = "notes";

export class NotesDB extends Dexie {
  constructor() {
    super("web-notes");
    this.version(2)
      .stores({
        notes: schema,
        configs: configsSchema,
      })
      .upgrade(async (tx) => {
        const notes = await tx.table<INote, number>(NOTES_TABLE).toArray();
        let configs = notes.concat(defaultNote).reduce(
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
  updateNote(id: number, newNote: Partial<INote>) {
    return this.table<INote, number>(NOTES_TABLE).update(id, newNote);
  }
  deleteNote(id: number) {
    return this.table<INote, number>(NOTES_TABLE).delete(id);
  }

  getConfigs() {
    return this.table<Configs, number>(CONFIGS_TABLE).toCollection().first();
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

  updateCollection(name: string, subCollection: CollectionOptions) {
    return this.table<Configs, number>(CONFIGS_TABLE)
      .toCollection()
      .modify((cfg) => {
        cfg.collections[name] = { ...(cfg.collections[name] || {}), ...subCollection };
      });
  }
}
