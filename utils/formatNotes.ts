import { INote, Collection, Configs } from "../src/store/types";
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
        favicon: cfg.collections[currentNote.website].favicon ?? "",
        notes: [currentNote, ...(collections[currentNote.website]?.notes || [])],
      };
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
