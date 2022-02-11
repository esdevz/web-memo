import { Collection } from "../main/store/types";
import { DB_NAME } from "./defaults";

export const defaultState = (
  collection: Record<string, Collection>,
  activeTab: string
): boolean => {
  const initialState =
    Object.keys(collection).length === 1 && collection[DB_NAME].notes.length === 1;
  const emptyNotesCollection =
    collection[DB_NAME].notes.length === 1 && activeTab === DB_NAME;
  return initialState || emptyNotesCollection;
};
