import SideBar from "../components/layout/SideBar";
import NotesPanel from "../components/layout/NotesPanel";
import "./HomePage.css";
import HeaderBar from "../components/layout/HeaderBar";
import { useState, useEffect } from 'react';

import type { Note } from "../api/noteAPI";
import type { Notebook } from "../api/notebookAPI";
import { getNotesByNotebook }  from "../api/noteAPI";

function HomePage() {

  const [selectedListItem, setSelectedListItem] =  useState<number | null>(null);
  const [note, setNote] = useState<Note[]>([]);
  const [notebook, setNotebook] = useState<Notebook[]>([]);

  useEffect(() => {
    if (selectedListItem === null) {
      setNote([]);
      return;
    }

    async function loadNotes() {
      const data = await getNotesByNotebook(selectedListItem);
      setNote(data);
    }

    loadNotes();
  }, [selectedListItem]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar selectedListItem={selectedListItem} 
            setSelectedListItem={setSelectedListItem}
            note={note}
            setNote={setNote}
            notebook={notebook}
            setNotebook={setNotebook}
              />
        <div className="home-page-content">
          <main>
            <div>
              <HeaderBar notebook={notebook} selectedListItem={selectedListItem} />
            </div>
            <div >
              <NotesPanel selectedListItem={selectedListItem} setNote={setNote} note={note}/>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
