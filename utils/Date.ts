export function dateString(date: number) {
  return new Date(date).toLocaleString(navigator.language, {
    year: "numeric",
    month: "short",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function rTime(current: number, time: number, toLocaleString?: boolean) {
  if (toLocaleString) {
    return dateString(time);
  }

  const diff = current - time;
  const min = 60 * 1000,
    hour = min * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 30,
    year = month * 12;

  if (diff < 1000) {
    return "now";
  } else if (diff < min) {
    return `a moment ago`;
  } else if (diff < hour) {
    const mins = Math.round(diff / min);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.round(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < week) {
    const days = Math.round(diff / day);
    return days <= 1 ? "yesterday" : `${days} days ago`;
  } else if (diff < month) {
    const weeks = Math.round(diff / week);
    return weeks <= 1 ? "last week" : `${weeks} weeks ago`;
  } else if (diff < year) {
    const months = Math.round(diff / month);
    return months <= 1 ? "last month" : `${months} months ago`;
  } else if (diff > year) {
    const years = Math.round(diff / year);
    return years <= 1 ? "last year" : `${years} years ago`;
  } else {
    return dateString(time);
  }
}
