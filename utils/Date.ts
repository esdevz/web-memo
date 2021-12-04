export function dateString(date: number) {
  return new Date(date).toLocaleString(navigator.language, {
    year: "numeric",
    month: "short",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
