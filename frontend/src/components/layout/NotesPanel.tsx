import NoteCard from "../notes/NoteCard.tsx";
import "./NotesPanel.css";
import * as React from 'react';
import type { Note } from '../../pages/HomePage';

type NotesPanelProps = {
  selectedListItem: number | null;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
  note: Note[];
};

function NotesPanel({ selectedListItem, setNote, note } : NotesPanelProps) {
  const [expandedNoteId, setExpandedNoteId] = React.useState<number | null>(null);


  return (
    <>
      <div className="notes-panel">
      {note.filter(item => item.notebookId === selectedListItem).map((singleNote) =>
            <NoteCard key={singleNote.id}
              onClick={() => 
                setExpandedNoteId(singleNote.id)} 
              selectedListItem={selectedListItem} 
              note={singleNote}
              expandedNoteId={expandedNoteId}
              setExpandedNoteId={setExpandedNoteId}
              setNote={setNote}
            />
      )}
      </div>
    </>
  );
}

export default NotesPanel;
