import { INote } from "../main/store/types";
import { defaultNote } from "../utils/defaults";

export async function getTemporaryNote() {
  return new Promise<INote>((resolve) => {
    try {
      chrome.storage.local.get("note", (result) => {
        if (!("note" in result)) {
          resolve(defaultNote);
        }
        resolve(result.note);
      });
    } catch (err) {
      console.log(err);
      resolve(defaultNote);
    }
  });
}

export function setTemporaryNote(value: INote) {
  return chrome.storage.local.set({ note: value });
}
