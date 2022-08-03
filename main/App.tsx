import React, { startTransition, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Tooltip,
  useBoolean,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import EmptyCollection from "./components/main/EmptyCollection";
import Note from "./components/note/Note";
import NotesContainer from "./components/note/NotesContainer";
import NoteSection from "./components/note/NoteSection";
import Separator from "./components/note/NoteSeparator";
import CollectionTabs from "./components/tab/CollectionTabs";
import useNoteStore from "./store/noteStore";
import Settings from "./components/main/Settings";
import Modal, { AltActionButton } from "../ui/drawer/Modal";
import Drawer from "../ui/drawer/Drawer";
import EditCollectionForm from "../ui/shared/EditCollectionForm";
import { CollectionOptions } from "./store/types";
import SearchNotes from "./components/main/SearchNotes";
import Export from "./components/main/Export";

import shallow from "zustand/shallow";
import Preferences from "./components/main/Preferences";

const App = () => {
  const [collections, activeTab, addNewNote, layout, updateCollection] =
    useNoteStore(
      useCallback(
        (state) => [
          state.collections,
          state.activeTab,
          state.addNewNote,
          state.tabLayout,
          state.updateCollection,
        ],
        []
      ),
      shallow
    );

  useEffect(() => {
    browser.runtime.onMessage.addListener(
      (request: { msg: string; collectionProps: CollectionOptions }) => {
        if (request.msg === "NEW_NOTE") {
          addNewNote(request.collectionProps);
        }
      }
    );
  }, [addNewNote]);

  const [smallScreen] = useMediaQuery("(max-width: 55em)");
  const [expandSettings, { toggle, off }] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const closeModal = () => {
    onClose();
    startTransition(() => {
      off();
    });
  };
  const pinnedNote = useMemo(() => {
    return collections[activeTab].notes.filter((note) => note.isPinned);
  }, [activeTab, collections]);

  const otherNotes = useMemo(() => {
    return collections[activeTab].notes.filter((note) => !note.isPinned);
  }, [activeTab, collections]);

  return (
    <Box as="main" w="100vw" h="100vh">
      <Grid
        h="full"
        templateRows="1fr"
        templateColumns="repeat( 16 , 1fr)"
        gap={3}
        overflow="auto"
      >
        <CollectionTabs />
        <NotesContainer smallScreen={smallScreen} layout={layout}>
          <EmptyCollection collections={collections} activeTab={activeTab} />
          {pinnedNote.length > 0 && (
            <>
              <Separator as="h3" colSpan={1}>
                Pinned
              </Separator>
              <NoteSection>
                {pinnedNote.map((note) => (
                  <Note key={note.id} note={note} />
                ))}
              </NoteSection>
              <Separator as="h3" colSpan={1}>
                Other
              </Separator>
            </>
          )}
          <NoteSection>
            {otherNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </NoteSection>
        </NotesContainer>
      </Grid>
      <Settings openDrawer={openDrawer} openModal={onOpen} />
      <Modal
        size={`${expandSettings ? "4xl" : "md"}`}
        modalTitle={activeTab}
        onClose={closeModal}
        isOpen={isOpen}
        returnFocusOnClose={false}
        disableCloseButton
        altActionComponent={
          <Tooltip label="more settings">
            <AltActionButton aria-label="more settings" size="md" onClick={toggle} />
          </Tooltip>
        }
        modalBodyProps={{
          display: "grid",
          gridTemplateColumns: `repeat(${expandSettings ? 2 : 1},1fr)`,
          gridColumnGap: "1.2rem",
        }}
      >
        <EditCollectionForm
          editCollection={updateCollection}
          url={activeTab}
          dispalyName={collections[activeTab].displayName}
          iconType={collections[activeTab].customIconType}
          favicon={collections[activeTab].favicon}
        />

        <Export />
        {expandSettings && <Preferences />}
      </Modal>
      <Drawer
        size="xl"
        drawerTitle="Search"
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
        returnFocusOnClose={false}
      >
        <SearchNotes />
      </Drawer>
    </Box>
  );
};

export default App;
