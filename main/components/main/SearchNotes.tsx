import React, { useState, useDeferredValue, useMemo } from "react";
import { Box, Grid, Input } from "@chakra-ui/react";
import Note from "../note/Note";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../store/db";

const SearchNotes = () => {
  const [search, setSearch] = useState("");
  const results = useDeferredValue(
    useLiveQuery(() => db.filterNotes(search), [search])
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const renderResults = useMemo(() => {
    return results?.map((note) => <Note key={note.id} note={note} />);
  }, [results]);

  return (
    <Box w="100%" h="100%">
      <form onSubmit={submitSearch}>
        <Input
          name="search"
          value={search}
          w="full"
          placeholder="type a minimum of 3 characters"
          type="text"
          onChange={handleChange}
        />
      </form>
      <Grid
        w="full"
        h="100%"
        as="section"
        display="grid"
        gridGap="1.5"
        gridTemplateColumns="repeat(auto-fill, 20.3rem)"
        gridTemplateRows="repeat(auto-fill, 16.3rem)"
        sx={{
          scrollbarWidth: "thin",
        }}
      >
        {renderResults}
      </Grid>
    </Box>
  );
};

export default SearchNotes;
