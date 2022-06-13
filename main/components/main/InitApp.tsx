import React, { useCallback, useEffect, useState } from "react";
import { Progress, Box } from "@chakra-ui/react";
import useNoteStore from "../../store/noteStore";

interface AppProps {
  children?: React.ReactNode;
}

const InitApp = (props: AppProps) => {
  const [loading, setLoading] = useState(true);
  const getNotes = useNoteStore(useCallback((state) => state.getConfigs, []));

  useEffect(() => {
    getNotes().then(() => setLoading(false));
  }, [getNotes]);

  if (loading) {
    return (
      <Box display="grid" w="100vw" h="100vh" placeItems="center">
        <Progress w="50%" size="xs" colorScheme="cyan" isIndeterminate />
      </Box>
    );
  }
  return <> {props.children} </>;
};

export default InitApp;
