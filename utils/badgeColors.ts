const bgColor = "rgb(70, 52, 90)";
const errorBgColor = "lightcoral";

export function setBadgeSaving() {
  chrome.action.setBadgeText({ text: "..." });
  chrome.action.setBadgeBackgroundColor({ color: bgColor });
}

export function setBadgeSavingSuccess() {
  chrome.action.setBadgeText({ text: "✔" });
  chrome.action.setBadgeBackgroundColor({ color: bgColor });
}

export function setBadgeSavingError() {
  chrome.action.setBadgeText({ text: "☹" });
  chrome.action.setBadgeBackgroundColor({ color: errorBgColor });
}

export function setBadgeTempNote() {
  chrome.action.setBadgeText({ text: "I" });
  chrome.action.setBadgeBackgroundColor({ color: bgColor });
}

export function clearBadges() {
  chrome.action.setBadgeText({ text: "" });
}
