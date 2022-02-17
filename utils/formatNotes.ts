import { INote, Collection, Configs } from "../main/store/types";
import { defaultNote } from "./defaults";

export function dbNotes(collection: Record<string, Collection>) {
  let notes: INote[] = [];
  Object.keys(collection).forEach((website) => {
    notes = notes.concat(collection[website].notes);
  });
  return notes;
}

export const formatNotes = (noteArray: INote[], cfg: Configs) => {
  const collections: Record<string, Collection> = {};
  const collectionOptions = Object.entries(cfg.collections).sort(
    (col, colNext) => (col[1]?.order || 0) - (colNext[1]?.order || 0)
  );
  for (let [name, options] of collectionOptions) {
    collections[name] = { ...options, notes: [] };
  }
  for (let note of noteArray.concat(defaultNote)) {
    collections[note.website] = {
      displayName: cfg.collections[note.website]?.displayName || note.website,
      customIconType: cfg.collections[note.website]?.customIconType || "default",
      favicon: cfg?.collections[note.website]?.favicon ?? "",
      notes: collections[note.website].notes,
    };
    collections[note.website].notes.unshift(note);
  }
  return collections;
};
