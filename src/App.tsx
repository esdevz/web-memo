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
    return <div>you didn't save any notes yet </div>;
  }
  return (
    <Box as="main" w="100vw" h="100vh">
      <Grid
        h="full"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap={3}
      >
        <GridItem
          role="tablist"
          aria-label="websites"
          as="section"
          rowSpan={1}
          colSpan={2}
          gridGap="2"
          display="flex"
          flexDirection="column"
        >
          {Object.keys(notes).map((url) => (
            <Tab key={url} note={notes[url][0]} />
          ))}
        </GridItem>
        <GridItem
          role="tabpanel"
          tabIndex={0}
          as="section"
          rowSpan={1}
          colSpan={6}
          display="flex"
          flexWrap="wrap"
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
