import { useEffect, useState } from "react";
import { FC } from "react";
import { useCallback } from "react";
import useNoteStore from "../../store/noteStore";

const InitApp: FC = (props) => {
  const [loading, setLoading] = useState(true);
  const getNotes = useNoteStore((state) => state.getNotes);

  const getNotesCallback = useCallback(
    async () => await getNotes(),
    [getNotes]
  );

  useEffect(() => {
    getNotesCallback().then(() => setLoading(false));
  }, [getNotesCallback]);
  if (loading) {
    return <div> loading... </div>;
  }
  return <> {props.children} </>;
};

export default InitApp;
