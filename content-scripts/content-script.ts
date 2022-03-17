const onMessageHandler = (
  request: string,
  _: any,
  sendResponse: (response?: any) => void
) => {
  if (request === "GET_SELECTION") {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const fragment = range?.cloneContents();

    if (fragment) {
      const node = document.createElement("div");
      node.append(fragment);
      sendResponse({ data: node.innerHTML });
    }
  }
};

chrome.runtime.onMessage.addListener(onMessageHandler);

export {};
