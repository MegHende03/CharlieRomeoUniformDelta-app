import SideBar from "../components/layout/SideBar.tsx";
import NotesPanel from "../components/layout/NotesPanel.tsx";
import HeaderBar from "../components/layout/HeaderBar.tsx";
import "./HomePage.css";
import { useState } from "react";

function HomePage() {
  const [selectedNotebookName, setSelectedNotebookName] = useState(
    "Select a notebook...",
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar onNotebookClick={setSelectedNotebookName} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <main className="home-page-content">
            <HeaderBar selectedNotebookName={selectedNotebookName} />
            <NotesPanel />
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
