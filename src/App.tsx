import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DarkModeSwitch } from "./components/main/DarkModeSwitch";
import Tab from "./components/main/Tab";
import Note from "./components/note/Note";

import useNoteStore from "./store/noteStore";

const App = () => {
  const [notes, activeTab] = useNoteStore((state) => [
    state.notes,
    state.activeTab,
  ]);
  if (Object.keys(notes).length === 0) {
    return <div>You didn't save any notes yet </div>;
  }
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
        <GridItem
          pos="relative"
          role="tabpanel"
          tabIndex={0}
          as="section"
          rowSpan={1}
          colSpan={6}
          display="grid"
          gridGap="1"
          gridTemplateColumns="repeat(auto-fill, 345px)"
          gridTemplateRows="repeat(auto-fill,265px)"
          overflow="auto"
          sx={{
            scrollbarWidth: "thin",
          }}
        >
          {notes[activeTab].map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </GridItem>
      </Grid>

      <DarkModeSwitch />
    </Box>
  );
};

export default App;
