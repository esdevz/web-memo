import { sanitize, Config } from "dompurify";

const sanitizeOptions: Config = {
  ALLOWED_TAGS: [
    "img",
    "br",
    "em",
    "strong",
    "sup",
    "sub",
    "div",
    "pre",
    "code",
    "ul",
    "li",
    "ol",
    "h1",
    "h2",
    "h3",
  ],
  ALLOWED_ATTR: ["src"],
};
export function sanitizeHtml(html?: string): string {
  return sanitize(html || "...", sanitizeOptions) as string;
}
