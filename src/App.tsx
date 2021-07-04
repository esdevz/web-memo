import Dexie from "dexie";
import { useEffect } from "react";
import Note from "./components/note/Note";

const App = () => {
  useEffect(() => {
    const db = new Dexie("web-memo");
    db.version(1).stores({
      notes: "++id ,title,website,favicon,content,createdAt",
    });
    db.table("notes")
      .toArray()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return <Note />;
};

export default App;
