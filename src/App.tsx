import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { DarkModeSwitch } from "./components/main/DarkModeSwitch";
import EmptyCollection from "./components/main/EmptyCollection";
import Tab from "./components/main/Tab";
import Note from "./components/note/Note";
import NotesContainer from "./components/note/NotesContainer";
import NoteSection from "./components/note/NoteSection";
import Separator from "./components/note/NoteSeparator";
import useNoteStore from "./store/noteStore";

const App = () => {
  const [notes, activeTab, addNewNote] = useNoteStore(
    useCallback((state) => [state.notes, state.activeTab, state.addNewNote], [])
  );

  useEffect(() => {
    browser.runtime.onMessage.addListener((request) => {
      if (request.msg === "NEW_NOTE") {
        addNewNote();
      }
    });
  }, [addNewNote]);

  const pinnedNote = useMemo(() => {
    return notes[activeTab].filter((note) => note.isPinned);
  }, [activeTab, notes]);

  const otherNotes = useMemo(() => {
    return notes[activeTab].filter((note) => !note.isPinned);
  }, [activeTab, notes]);

  return (
    <Box as="main" w="100vw" h="100vh">
      <Grid
        h="full"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap={3}
        overflow="auto"
      >
        <GridItem
          p="1"
          role="tablist"
          aria-label="websites"
          as="section"
          rowSpan={1}
          colSpan={2}
          gridGap="2"
          display="grid"
          overflow="auto"
          gridAutoRows="max-content"
          sx={{
            scrollbarWidth: "thin",
          }}
        >
          {Object.keys(notes).map((url) => (
            <Tab key={url} note={notes[url][0]} />
          ))}
        </GridItem>
        <NotesContainer>
          <EmptyCollection notes={notes} />
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

      <DarkModeSwitch />
    </Box>
  );
};

export default App;
