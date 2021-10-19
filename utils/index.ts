export * from "./defaults";
export * from "./defaultState";
export * from "./formatNotes";
export * from "./sanitizeHtml";

export function getHostName(url: string) {
  try {
    let hostName = new URL(url).hostname;
    if (hostName === "") {
      return "notes";
    }
    return hostName;
  } catch {
    return "notes";
  }
}

export function dateString(date: number) {
  return new Date(date).toLocaleString(navigator.language, {
    year: "numeric",
    month: "short",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function themeColorPalette(colors: string[]) {
  return colors.reduce((palette: Record<number, string>, color, i) => {
    palette[(i + 1) * 100] = color;
    return palette;
  }, {});
}
