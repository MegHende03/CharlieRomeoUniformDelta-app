import "./NoteCard.css";
import type { Note } from '../../pages/HomePage';
import { useState } from 'react';

type NotesCardProps = {
  selectedListItem: number | null;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
  note: Note;
};

function NoteCard({ selectedListItem, setNote, note } : NotesCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const now = Date.now();
  let daysAgo;
  
  if(selectedListItem !== null) {
    const differenceInMs = now - selectedListItem;
    daysAgo = Math.floor(
    differenceInMs / (1000 * 60 * 60 * 24)
  );
  }

  return (
    <>
        <div onClick={() => setIsExpanded(true)} className="note-card">
          <p className="note-card-title">{note.title}</p>
          <p className="note-card-description">
            {note.content}
          </p>
          <p className="note-card-date">{daysAgo} Days ago...</p>
        </div>

        {isExpanded &&
        
          }
    </>
  );
}

export default NoteCard;
