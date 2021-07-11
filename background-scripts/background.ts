const SAVE_NOTE_ID = "save-as-note";

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

function getHostName(url: string) {
  try {
    let hostName = new URL(url).hostname;
    return hostName;
  } catch {
    return "notes";
  }
}

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "save",
  contexts: ["selection"],
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

export {};
