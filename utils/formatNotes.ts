import { INote, Collection, Configs } from "../main/store/types";
import { defaultNote } from "./defaults";

export const formatNotes = (
  noteArray: INote[],
  cfg: Configs
): Record<string, Collection> => {
  return noteArray.concat(defaultNote).reduce(
    (collections: Record<string, Collection>, currentNote) => {
      collections[currentNote.website] = {
        displayName:
          cfg.collections[currentNote.website]?.displayName || currentNote.website,
        customIconType: cfg.collections[currentNote.website]?.customIconType || "default",
        favicon: cfg?.collections[currentNote.website]?.favicon ?? "",
        notes: collections[currentNote.website]?.notes || [],
      };
      collections[currentNote.website].notes.unshift(currentNote);
      return collections;
    },
    {
      notes: {
        displayName: "notes",
        customIconType: "default",
        favicon: "",
        notes: [],
      },
    }
  );
};

export function dbNotes(collection: Record<string, Collection>) {
  let notes: INote[] = [];
  Object.keys(collection).forEach((website) => {
    notes = notes.concat(collection[website].notes);
  });
  return notes;
}
