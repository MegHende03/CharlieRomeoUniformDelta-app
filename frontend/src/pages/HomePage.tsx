import SideBar from "../components/layout/SideBar";
import NotesPanel from "../components/layout/NotesPanel";
import "./HomePage.css";
import HeaderBar from "../components/layout/HeaderBar";
import { useState } from 'react';

export type Note = {
        id: number;
        title: string;
        content: string;
        notebookId: number | null;
  };

import type { Notebook } from "../api/notebookAPI"

function HomePage() {

  const [selectedListItem, setSelectedListItem] =  useState<number | null>(null);
  const [note, setNote] = useState<Note[]>([]);
  const [notebook, setNotebook] = useState<Notebook[]>([]);

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
