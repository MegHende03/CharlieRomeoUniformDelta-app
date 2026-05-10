import SideBar from "../components/layout/SideBar.tsx";
import NotesPanel from "../components/layout/NotesPanel.tsx";
import "./HomePage.css";

import SideBar from '../components/layout/SideBar.tsx'
import '../styles/HomePage.css'

function HomePage() {
  return (
    <>
      <div className="home-page-layout">
        <SideBar />
        <main className="home-page-content">
          <NotesPanel />
        </main>
      </div>
    </>
  );
}

export default HomePage;
