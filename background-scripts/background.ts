import { INote } from "../src/store/types";

const hostName = (url: string) => {
  try {
    let hostName = new URL(url).hostname;
    if (hostName === "") {
      return "notes";
    }
    return hostName;
  } catch {
    return "notes";
  }
};

const SAVE_NOTE_ID = "save-as-note";

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

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "Save",
  contexts: ["selection"],
  documentUrlPatterns: ["*://*/*"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    let note = {
      title: tab?.title || "",
      website: hostName(tab?.url || ""),
      fullUrl: tab?.url || "",
      favicon: tab?.favIconUrl || "",
      content: info.selectionText || "",
      isPinned: false,
      createdAt: Date.now(),
    };
    browser.sidebarAction.isOpen({}).then((isOpen) => {
      if (isOpen) {
        browser.runtime.sendMessage({
          msg: "EDIT_NOTE",
          note,
        });
      } else {
        backgroundNote = note;
      }
    });

    browser.sidebarAction.open();
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});

browser.runtime.onMessage.addListener((request, __, sendResponse) => {
  if (request.msg === "GET_NOTE") {
    sendResponse(backgroundNote);
    backgroundNote = initialNoteState;
  }
});
