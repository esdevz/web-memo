import { Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";
import styled from "@emotion/styled";
import { INote } from "../../store/types";

const Note = ({ note }: NoteProps) => {
  if (note.createdAt === 0) {
    return null;
  }
  return (
    <StyledNote
      as="article"
      shadow="md"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(1, 1fr)"
      gap={2}
      m="1"
    >
      <GridItem rowSpan={1} maxW="315px">
        <Heading as="h1" size="md" isTruncated>
          {note.title}
        </Heading>
      </GridItem>

      <GridItem rowSpan={2}>
        <Text
          fontSize="smaller"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "6",
            WebkitBoxOrient: "vertical",
          }}
          overflow="hidden"
        >
          {note.content}
        </Text>
      </GridItem>

      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        rowSpan={1}
      >
        <Text as="em" fontSize="xs">
          {note.createdAt}
        </Text>
        <NoteOptions />
      </GridItem>
    </StyledNote>
  );
};

export default Note;

interface NoteProps {
  note: INote;
}

const StyledNote = styled(Grid)`
  width: 340px;
  height: 250px;
  padding: 10px;
`;
