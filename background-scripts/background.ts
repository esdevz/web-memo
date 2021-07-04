import Dexie from "dexie";

const SAVE_NOTE_ID = "save-as-note";
const db = new Dexie("web-memo");
db.version(1).stores({
  notes: "++id ,title , website ,favicon ,content,createdAt",
});

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "save",
  contexts: ["selection"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    let note = {
      title: tab?.title || "",
      website: tab?.url || "",
      favicon: tab?.favIconUrl || "",
      content: info.selectionText || "",
      createdAt: Date.now(),
    };
    console.log(note);
    window.bgNote = note;
    browser.browserAction.openPopup();
    db.table("notes")
      .put(note)
      .then(() => console.log("added to notes"))
      .catch((err) => console.log(err));
  }
});

interface BackgroundWindow extends Window {
  bgNote: any;
}

declare const window: BackgroundWindow;
