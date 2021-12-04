const bgColor = "rgb(70, 52, 90)";
const errorBgColor = "lightcoral";

export function setBadgeSaving() {
  browser.browserAction.setBadgeText({ text: "..." });
  browser.browserAction.setBadgeBackgroundColor({ color: bgColor });
}

export function setBadgeSavingSuccess() {
  browser.browserAction.setBadgeText({ text: "✔" });
  browser.browserAction.setBadgeBackgroundColor({ color: bgColor });
}

export function setBadgeSavingError() {
  browser.browserAction.setBadgeText({ text: "☹" });
  browser.browserAction.setBadgeBackgroundColor({ color: errorBgColor });
}

export function setBadgeTempNote() {
  browser.browserAction.setBadgeText({ text: "I" });
  browser.browserAction.setBadgeBackgroundColor({ color: bgColor });
}

export function clearBadges() {
  browser.browserAction.setBadgeText({ text: "" });
}
