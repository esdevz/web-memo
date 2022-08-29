import { useEffect } from "react";

interface EventsCallbacks {
  search: () => void;
  collection: () => void;
  toggleLayout: () => void;
}

function handleKeyboardShortcuts(e: KeyboardEvent, handlers: EventsCallbacks) {
  e.stopImmediatePropagation();
  switch (e.key) {
    case e.ctrlKey && e.altKey && "f":
    case e.ctrlKey && e.altKey && "F":
      handlers.search();
      break;
    case e.ctrlKey && e.altKey && "c":
    case e.ctrlKey && e.altKey && "C":
      handlers.collection();
      break;
    case e.ctrlKey && e.altKey && "l":
    case e.ctrlKey && e.altKey && "L":
      handlers.toggleLayout();
      break;
    default:
      break;
  }
}

export function useKeyboard(handlers: EventsCallbacks) {
  useEffect(() => {
    document.addEventListener("keydown", (e) =>
      handleKeyboardShortcuts(e, handlers)
    );

    return () => {
      document.removeEventListener("keydown", (e) =>
        handleKeyboardShortcuts(e, handlers)
      );
    };
  }, [handlers]);
}
