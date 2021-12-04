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
  return html.replace(/([&<>\"'])|([^\S\r\n]{1,}) /g, (match) => {
    if (match.length > 1) {
      return `<br/>${match}`;
    }

    return htmlEntities[match];
  });
}
