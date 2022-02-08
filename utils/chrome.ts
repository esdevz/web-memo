export function sendMessage(
  tabId: number,
  message: string,
  options: chrome.tabs.MessageSendOptions
): Promise<string> {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, options, (response: { data?: string }) => {
      if (response.data) {
        resolve(response.data);
      } else {
        resolve("");
      }
    });
  });
}
