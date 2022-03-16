import { sanitize, Config } from "dompurify";

const sanitizeOptions: Config = {
  ALLOWED_ATTR: ["src", "alt", "style"],
  ALLOW_DATA_ATTR: false,
};

export function sanitizeHtml(html?: string): string {
  return sanitize(html ?? "", sanitizeOptions) as string;
}
