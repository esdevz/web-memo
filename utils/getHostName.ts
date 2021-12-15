export const getHostName = (url: string) => {
  try {
    const hostName = new URL(url).hostname;
    if (hostName === "") {
      return "notes";
    }
    return hostName;
  } catch {
    return "notes";
  }
};
