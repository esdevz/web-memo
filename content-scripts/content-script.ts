const onMessageHandler = (
  request: string,
  _: any,
  sendResponse: (response?: any) => void
) => {
  if (request === "GET_SELECTION") {
    const selection = window.getSelection();
    sendResponse({ data: selection?.toString() });
  }
};

chrome.runtime.onMessage.addListener(onMessageHandler);

export {};
