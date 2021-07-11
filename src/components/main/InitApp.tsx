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
    return <div> loading... </div>;
  }
  return <> {props.children} </>;
};

export default InitApp;
