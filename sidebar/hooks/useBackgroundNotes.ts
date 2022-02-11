import { NotesDB } from "../../idb/NotesDb";
import { useCallback, useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import { CustomIcon, INote } from "../../main/store/types";
import { getTemporaryNote } from "../../idb/storageArea";
import { getFaviconDataURL } from "../../utils/getFaviconDataURL";

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

export function useBackgroundNote() {
  const [note, setNote] = useState(initialNoteState);
  const [collections, setUserCollections] = useState(["notes"]);
  const [loading, setLoading] = useState(false);
  const [draftNoteLoading, setDraftNoteLoading] = useState(false);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const onMessageHandler = (request: {
      msg: string;
      note?: INote;
      collection?: string;
    }) => {
      if (request.msg === "TOGGLE_COLOR_MODE") {
        toggleColorMode();
      }
      if (request.msg === "DELETE") {
        setUserCollections((currentCollections) =>
          currentCollections.filter((col) => col !== request.collection)
        );
      }
    };

    chrome.runtime.onMessage.addListener(onMessageHandler);

    return () => chrome.runtime.onMessage.removeListener(onMessageHandler);
  }, [toggleColorMode]);

  useEffect(() => {
    setDraftNoteLoading(true);
    Promise.all([db.getConfigs(), getTemporaryNote()]).then(([cfg, note]) => {
      const userCollections = Object.keys(cfg.collections);
      setUserCollections(userCollections);
      setNote(note);
      setDraftNoteLoading(false);
    });
  }, []);

  const saveNote = useCallback(
    async (newNote: INote, icon: CustomIcon) => {
      setLoading(true);
      const dataUrl = await getFaviconDataURL(newNote.favicon);
      const existingCollection = collections.includes(newNote.website);
      let collectionProps = existingCollection
        ? {}
        : {
            displayName: newNote.website,
            customIconType: icon,
            favicon: dataUrl,
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

  return { note, setNote, saveNote, loading, collections, draftNoteLoading };
}
