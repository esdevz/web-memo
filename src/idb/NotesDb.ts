import Dexie from "dexie";
import { INote } from "../store/types";

const schema = "++id ,title ,website, fullUrl,createdAt",
  TABLE_NAME = "notes";

export class NotesDB extends Dexie {
  constructor() {
    super("web-notes");
    this.version(1).stores({
      notes: schema,
    });
  }

  putNote(note: INote) {
    return this.table<INote, number>(TABLE_NAME).put(note);
  }
  getLastNote() {
    return this.table<INote, number>(TABLE_NAME).toCollection().last();
  }
  getNotes() {
    return this.table<INote, number>(TABLE_NAME).orderBy("createdAt").toArray();
  }
  updateNote(id: number, newNote: Partial<INote>) {
    return this.table<INote, number>(TABLE_NAME).update(id, newNote);
  }
  deleteNote(id: number) {
    return this.table<INote, number>(TABLE_NAME).delete(id);
  }
}
