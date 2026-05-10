import NoteCard from "../notes/NoteCard.tsx";
import "./NotesPanel.css";

function NotesPanel() {
  return (
    <>
      <div className="notes-panel">
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </>
  );
}

export default NotesPanel;
