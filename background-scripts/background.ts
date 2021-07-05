const SAVE_NOTE_ID = "save-as-note";

export const initialNoteState = {
  title: "",
  website: "",
  favicon: "",
  content: "",
  createdAt: 0,
  isPinned: false,
};

interface BackgroundWindow extends Window {
  bgNote: any;
}

declare const window: BackgroundWindow;

window.bgNote = initialNoteState;

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "save",
  contexts: ["selection"],
});

browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    let note = {
      title: tab?.title || "",
      website: tab?.url || "",
      favicon: tab?.favIconUrl || "",
      content: info.selectionText || "",
      isPinned: false,
      createdAt: Date.now(),
    };
    window.bgNote = note;
    await browser.browserAction.openPopup();
  }
});
