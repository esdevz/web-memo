const bgColor = "rgb(70, 52, 90)";
const errorBgColor = "lightcoral";

export function setBadgeSaving() {
  browser.action.setBadgeText({ text: "..." });
  browser.action.setBadgeBackgroundColor({ color: bgColor });
}

export function setBadgeSavingSuccess() {
  browser.action.setBadgeText({ text: "✔" });
  browser.action.setBadgeBackgroundColor({ color: bgColor });
}

export function setBadgeSavingError() {
  browser.action.setBadgeText({ text: "☹" });
  browser.action.setBadgeBackgroundColor({ color: errorBgColor });
}

export function setBadgeTempNote() {
  browser.action.setBadgeText({ text: "I" });
  browser.action.setBadgeBackgroundColor({ color: bgColor });
}

export function clearBadges() {
  browser.action.setBadgeText({ text: "" });
}
