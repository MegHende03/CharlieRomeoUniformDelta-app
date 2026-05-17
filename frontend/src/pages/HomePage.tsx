import SideBar from "../components/layout/SideBar.tsx";
import NotesPanel from "../components/layout/NotesPanel.tsx";
import "./HomePage.css";
import HeaderBar from "../components/layout/HeaderBar.tsx";

function HomePage() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <main className="home-page-content">
            <HeaderBar />
            <NotesPanel />
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
