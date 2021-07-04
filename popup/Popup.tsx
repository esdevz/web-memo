import { Box, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

interface INote {
  id?: number;
  title: string;
  website: string;
  favicon: string;
  content: string;
  createdAt: number;
}
declare global {
  interface Window {
    bgNote: INote;
  }
}

const getBgNote = () => {
  let bgWindow = browser.extension.getBackgroundPage();

  if (bgWindow) {
    return bgWindow.bgNote;
  }
  return null;
};

const Popup = () => {
  const [note] = useState<null | INote>(getBgNote);

  const openNotes = () => {
    browser.tabs.create({
      url: browser.extension.getURL("index.html"),
      active: true,
    });
  };
  return (
    <Box as="main" w="400px" h="400px">
      <VStack
        _hover={{
          backgroundColor: "goldenrod",
        }}
        backgroundColor="gold"
        h="100%"
        w="100%"
        justifyContent="center"
        align="center"
        spacing="5"
      >
        <Button onClick={openNotes}>Open Notes</Button>
        {note ? (
          <pre>{JSON.stringify(note, null, 2)}</pre>
        ) : (
          <h1> note is {typeof note} </h1>
        )}
      </VStack>
    </Box>
  );
};
export default Popup;
