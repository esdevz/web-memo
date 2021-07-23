import { Grid, Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useCallback } from "react";
import useNoteStore from "../../store/noteStore";

const InitApp: FC = (props) => {
  const [loading, setLoading] = useState(true);
  const getNotes = useNoteStore(useCallback((state) => state.getNotes, []));

  useEffect(() => {
    getNotes().then(() => setLoading(false));
  }, [getNotes]);
  if (loading) {
    return (
      <Grid w="100vw" h="100vh" placeItems="center">
        <Progress w="50%" size="xs" colorScheme="cyan" isIndeterminate />
      </Grid>
    );
  }
  return <> {props.children} </>;
};

export default InitApp;
