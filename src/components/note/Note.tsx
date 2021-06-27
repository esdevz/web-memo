import { Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import NoteOptions from "./NoteOptions";
import styled from "@emotion/styled";

const Note = () => {
  return (
    <StyledNote
      as="article"
      shadow="md"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(1, 1fr)"
      gap={2}
    >
      <GridItem rowSpan={1}>
        <Heading as="h1" size="md" isTruncated>
          Lorem ipsum dolor sit amet.
        </Heading>
      </GridItem>

      <GridItem rowSpan={2}>
        <Text
          fontSize="smaller"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
          overflow="hidden"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis,
          id. Cupiditate delectus aperiam doloribus nulla consequuntur
          temporibus aut quidem tempora, voluptatum unde animi aliquam eveniet
          ducimus assumenda, perspiciatis doloremque magnam quos facere. Sit
          iure id consequuntur voluptates illo quo quis optio adipisci quas a
          alias officiis, placeat, natus vitae? Id!
        </Text>
      </GridItem>

      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        rowSpan={1}
      >
        <Text as="em" fontSize="xs">
          Lorem ipsum dolor sit.
        </Text>
        <NoteOptions />
      </GridItem>
    </StyledNote>
  );
};

export default Note;

// interface NoteProps {
//   title: string;
//   created_at: string;
//   body: string;
//   isPinned: boolean;
// }

const StyledNote = styled(Grid)`
  width: 310px;
  height: 180px;
  padding: 10px;
`;
