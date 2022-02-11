import type { CollectionOptions, INote } from "../main/store/types";
import { NotesDB } from "../idb/NotesDb";
import { getTemporaryNote, setTemporaryNote } from "../idb/storageArea";
import { getHostName } from "../utils/getHostName";
import {
  clearBadges,
  setBadgeSaving,
  setBadgeSavingError,
  setBadgeSavingSuccess,
  setBadgeTempNote,
} from "../utils/badgeColors";
import { getFaviconDataURL } from "../utils/getFaviconDataURL";
import { sendMessage } from "../utils/chrome";

const SAVE_NOTE_ID = "save-as-note";

const db = new NotesDB();

const initialNoteState: INote = {
  title: "",
  website: "notes",
  fullUrl: "",
  favicon: "",
  content: "",
  createdAt: 0,
  isPinned: false,
};

let backgroundNote = initialNoteState;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: SAVE_NOTE_ID,
    title: "Save",
    contexts: ["selection"],
    documentUrlPatterns: ["*://*/*"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    setBadgeSaving();
    const data = await sendMessage(tab?.id!, "GET_SELECTION", {});
    const favicon = await getFaviconDataURL(tab?.favIconUrl);
    let note = {
      title: tab?.title || "",
      website: getHostName(tab?.url || ""),
      fullUrl: tab?.url || "",
      favicon: favicon,
      content: data,
      isPinned: false,
      createdAt: Date.now(),
    };

    const [configs, tempNote] = await Promise.all([db.getConfigs(), getTemporaryNote()]);

    const collections = Object.keys(configs.collections);
    const existingCollection = collections.includes(note.website);

    let collectionProps = existingCollection
      ? {}
      : {
          displayName: note.website,
          customIconType: "default",
          favicon: note.favicon,
        };

    try {
      await Promise.all([
        db.updateCollection(note.website, collectionProps as CollectionOptions),
        db.putNote({ ...note, favicon: "" }),
      ]);
    } catch (err) {
      console.log(err);
      setBadgeSavingError();
      setTimeout(() => {
        if (tempNote.createdAt !== 0) {
          setBadgeTempNote();
        } else {
          clearBadges();
        }
      }, 1500);
    }

    chrome.runtime.sendMessage({ msg: "NEW_NOTE", collectionProps });
    setBadgeSavingSuccess();
    if (!existingCollection) {
      collections.push(note.website);
    }
    setTimeout(() => {
      if (tempNote.createdAt !== 0) {
        setBadgeTempNote();
      } else {
        clearBadges();
      }
    }, 500);
  }
});

chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(() => {
    if (backgroundNote.createdAt !== 0) {
      setTemporaryNote(backgroundNote);
    }
  });

  port.onMessage.addListener((request) => {
    if (request.msg === "EDITING" && request.note) {
      backgroundNote = request.note;
    }
    if (request.msg === "RESET") {
      setTemporaryNote(initialNoteState);
      backgroundNote = initialNoteState;
      clearBadges();
    }
    if (request.msg === "NOTE_SAVED") {
      setTemporaryNote(initialNoteState);
      backgroundNote = initialNoteState;
      clearBadges();
    }
  });
});
