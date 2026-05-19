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
  return (
    <>
      <div className="notes-panel">
      {note.map((note) =>
          <NoteCard selectedListItem={selectedListItem} setNote={setNote} note={note} />
      )}
      </div>
    </>
  );
}

export default NotesPanel;
