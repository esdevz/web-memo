import { INote, Collection, Configs, CollectionOptions } from "../main/store/types";

export function dbNotes(collection: Record<string, Collection>) {
  let notes: INote[] = [];
  Object.keys(collection).forEach((website) => {
    notes = notes.concat(collection[website].notes);
  });
  return notes;
}

export const formatCollections = (
  cfg: Configs
): Record<string, CollectionOptions> => {
  const sortedCollections = Object.entries(cfg.collections).sort(
    ([, col], [, colNext]) => (col.order || 0) - (colNext.order || 0)
  );
  const collections = Object.fromEntries(sortedCollections);

  return collections;
};
