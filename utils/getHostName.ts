export const getHostName = (url: string) => {
  try {
    let hostName = new URL(url).hostname;
    if (hostName === "") {
      return "notes";
    }
    return hostName;
  } catch {
    return "notes";
  }
};
