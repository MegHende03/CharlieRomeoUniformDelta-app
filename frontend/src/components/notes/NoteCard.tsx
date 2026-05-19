import "./NoteCard.css";
import type { Note } from '../../pages/HomePage';

type NotesCardProps = {
  selectedListItem: number | null;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
  note: Note;
};

function NoteCard({ selectedListItem, setNote, note } : NotesCardProps) {
  return (
    <>
      <div className="note-card">
        <p className="note-card-title">{note.title}</p>
        <p className="note-card-description">
          {note.content}
        </p>
        <p className="note-card-date">6 days ago</p>
      </div>
    </>
  );
}

export default NoteCard;
