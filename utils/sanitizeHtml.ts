import { sanitize, Config } from "dompurify";

const sanitizeOptions: Config = {
  ALLOWED_TAGS: [
    "img",
    "br",
    "em",
    "b",
    "u",
    "i",
    "blockquote",
    "del",
    "ins",
    "s",
    "strong",
    "sup",
    "sub",
    "div",
    "span",
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

export function sanitizeHtml(html?: string, paste?: boolean): string {
  if (!paste) {
    const opts: Config = {
      ...sanitizeOptions,
      ALLOWED_ATTR: sanitizeOptions.ALLOWED_ATTR!.concat("style"),
    };

    return sanitize(html ?? "", opts) as string;
  }
  return sanitize(html ?? "", sanitizeOptions) as string;
}
