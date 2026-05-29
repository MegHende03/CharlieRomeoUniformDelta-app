import NoteCard from "../notes/NoteCard.tsx";
import "./NotesPanel.css";
import * as React from 'react';
import type { Note } from '../../api/noteAPI.ts';

//Notes Panel displays each note located in the Note[] to the UI. (Only a small preview)
//When the note is clicked by the user, the note expands to fully view its contents.

//Props:
//selectedListItem: Displays the notes belonging to the currently selected notebook.
//setNote: Prop passed to <NoteCard /> for update and delete functions.
//note: array of notes
type NotesPanelProps = {
  selectedListItem: number | null;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
  note: Note[];
};

//Passes expandedNoteId state variable. When the user clicks on a note, The note expands, enabling editing + deleting + full view of notes contents. 
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
