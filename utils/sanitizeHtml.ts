import { sanitize, Config } from "dompurify";

const sanitizeOptions: Config = {
  USE_PROFILES: {
    html: true,
    mathMl: true,
  },
};

export function sanitizeHtml(html?: string): string {
  return sanitize(html ?? "", sanitizeOptions) as string;
}
