import { sanitize, Config } from "dompurify";

const sanitizeOptions: Config = {
  ALLOWED_TAGS: ["img", "br", "em", "strong", "sup", "sub"],
  ALLOWED_ATTR: ["src"],
};

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

export function sanitizeHtml(html?: string): string {
  return sanitize(html || "...", sanitizeOptions) as string;
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
