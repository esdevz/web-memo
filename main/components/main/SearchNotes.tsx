import React, { useCallback, useDeferredValue, useMemo, useState } from "react";
import { Box, Grid } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import useNoteStore from "../../store/noteStore";
import Note from "../note/Note";
import { dbNotes } from "../../../utils";

const SearchNotes = () => {
  const collections = useNoteStore(useCallback((state) => state.collections, []));
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    let notes = dbNotes(collections);
    if (search.trim().length < 3) {
      return [];
    }
    let lowercaseSearch = search.toLowerCase();

    return notes.filter(
      (note) =>
        note.content.toLowerCase().includes(lowercaseSearch) ||
        note.title.toLowerCase().includes(lowercaseSearch)
    );
  }, [search, collections]);

  const deferredResults = useDeferredValue(results);

  const searchResults = useMemo(() => {
    return deferredResults.map((note) => <Note key={note.id} note={note} />);
  }, [deferredResults]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
        {searchResults}
      </Grid>
    </Box>
  );
};

export default SearchNotes;
