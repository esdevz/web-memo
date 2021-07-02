const SAVE_NOTE_ID = "save-as-note";

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({
    url: "index.html",
    active: true,
  });
});

browser.menus.create({
  id: SAVE_NOTE_ID,
  title: "save",
  contexts: ["selection"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === SAVE_NOTE_ID) {
    let note = {
      title: tab?.title,
      website: tab?.url,
      favicon: tab?.favIconUrl || "",
      content: info.selectionText,
      createdAt: Date.now(),
    };
    console.log(note);
  }
});
