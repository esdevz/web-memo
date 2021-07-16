import { NotesDB } from "../src/idb/NotesDb";
import { getHostName } from "../utils";

const SAVE_NOTE_ID = "save-as-note";
const db = new NotesDB();

const initialNoteState = {
  title: "",
  website: "notes",
  fullUrl: "",
  favicon: "",
  content: "",
  createdAt: 0,
  isPinned: false,
};

let backgroundNote = initialNoteState;

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "Save",
  contexts: ["selection"],
  documentUrlPatterns: ["*://*/*"],
});

browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    let note = {
      title: tab?.title || "",
      website: getHostName(tab?.url || ""),
      fullUrl: tab?.url || "",
      favicon: tab?.favIconUrl || "",
      content: info.selectionText || "",
      isPinned: false,
      createdAt: Date.now(),
    };
    await db.putNote(note);
    backgroundNote = note;
    await browser.browserAction.openPopup();
  }
});

browser.runtime.onMessage.addListener((request, __, sendResponse) => {
  if (request.msg === "GET_NOTE") {
    sendResponse(backgroundNote);
    backgroundNote = initialNoteState;
  }
});
