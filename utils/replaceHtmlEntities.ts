const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export function replaceHtmlEntities(html?: string) {
  if (!html) {
    return "";
  }
  return html.replace(/([&<>\"'])/g, (match) => {
    return htmlEntities[match];
  });
}
