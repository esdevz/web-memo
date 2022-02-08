export async function getFaviconDataURL(url?: string): Promise<string> {
  if (!url) {
    return "";
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return Promise.resolve(url);
    }

    const blob = await res.blob();
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    return Promise.resolve(url);
  }
}
