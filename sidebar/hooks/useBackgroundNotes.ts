import { NotesDB } from "../../idb/NotesDb";
import { useCallback, useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import type { CustomFonts, CustomIcon, INote } from "../../main/store/types";

const db = new NotesDB();

export const initialNoteState: INote = {
  title: "",
  website: "notes",
  fullUrl: "",
  favicon: "",
  content: "",
  createdAt: 0,
  isPinned: false,
};

const initialFontsState: CustomFonts = {
  title: "",
  body: "",
  code: "",
  h1: "",
  h2: "",
  h3: "",
};

export function useBackgroundNote() {
  const [note, setNote] = useState(initialNoteState);
  const [collections, setUserCollections] = useState(["notes"]);
  const [customFonts, setCustomFonts] = useState(initialFontsState);
  const [loading, setLoading] = useState(false);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const onMessageHandler = (request: {
      msg: string;
      note?: INote;
      collection?: string;
    }) => {
      switch (request.msg) {
        case "TOGGLE_COLOR_MODE":
          toggleColorMode();
          break;
        case "DELETE":
          setUserCollections((currentCollections) =>
            currentCollections.filter((col) => col !== request.collection)
          );
          break;
        case "ADD":
          setUserCollections((current) => {
            if (request.collection) {
              return current.concat(request.collection);
            }
            return current;
          });

          break;
        default:
          break;
      }
    };

    browser.runtime.onMessage.addListener(onMessageHandler);

    return () => browser.runtime.onMessage.removeListener(onMessageHandler);
  }, [toggleColorMode]);

  useEffect(() => {
    db.getConfigs().then((cfg) => {
      const userCollections = Object.keys(cfg.collections);
      setUserCollections(userCollections);
      if (cfg.fonts) {
        setCustomFonts(cfg.fonts);
      }
    });
  }, []);

  const saveNote = useCallback(
    async (newNote: INote, icon: CustomIcon) => {
      setLoading(true);
      const existingCollection = collections.includes(newNote.website);
      const collectionProps = existingCollection
        ? {}
        : {
            displayName: newNote.website,
            customIconType: icon,
            favicon: newNote.favicon,
          };

      try {
        await Promise.all([
          db.updateCollection(newNote.website, collectionProps),
          db.putNote({ ...newNote, favicon: "" }),
        ]);
        setLoading(false);
        setUserCollections((currentCollection) => {
          if (currentCollection.includes(newNote.website)) {
            return currentCollection;
          }
          return currentCollection.concat(newNote.website);
        });
        return {
          msg: "note saved",
          state: true,
        };
      } catch (err) {
        console.log(err);
        setLoading(false);
        return {
          msg: "an error occured",
          state: false,
        };
      }
    },
    [collections]
  );

  return { note, setNote, saveNote, loading, collections, customFonts };
}
