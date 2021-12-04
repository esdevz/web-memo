import type { CollectionOptions } from "../src/store/types";
import { NotesDB } from "../idb/NotesDb";
import {
  clearBadges,
  setBadgeSaving,
  setBadgeSavingError,
  setBadgeSavingSuccess,
} from "../utils/badgeColors";
import { getHostName } from "../utils/getHostName";
import { replaceHtmlEntities } from "../utils/replaceHtmlEntities";

const SAVE_NOTE_ID = "save-as-note";

const db = new NotesDB();

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "Save",
  contexts: ["selection"],
  documentUrlPatterns: ["*://*/*"],
});

browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    setBadgeSaving();
    let note = {
      title: tab?.title || "",
      website: getHostName(tab?.url || ""),
      fullUrl: tab?.url || "",
      favicon: tab?.favIconUrl || "",
      content: replaceHtmlEntities(info.selectionText),
      isPinned: false,
      createdAt: Date.now(),
    };

    const configs = await db.getConfigs();

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
        clearBadges();
      }, 1500);
    }

    browser.runtime.sendMessage({ msg: "NEW_NOTE", collectionProps });
    setBadgeSavingSuccess();
    if (!existingCollection) {
      collections.push(note.website);
    }
    setTimeout(() => {
      clearBadges();
    }, 800);
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});
