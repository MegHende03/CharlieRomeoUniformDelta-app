import "./NoteCard.css";
import type { Note } from '../../pages/HomePage';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import close from '../../assets/closeLogo.svg';
import save from '../../assets/saveLogo.svg';
import { useState } from 'react';

type NotesCardProps = {
  onClick: () => void;
  selectedListItem: number | null;
  note: Note;
  expandedNoteId: number | null;
  setExpandedNoteId: React.Dispatch<React.SetStateAction<number | null>>
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
};

function NoteCard({ onClick, selectedListItem, note, expandedNoteId, setExpandedNoteId, setNote } : NotesCardProps) {

  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedNote, setEditedNote] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const expanded = expandedNoteId === note.id;

  const now = Date.now();
  let daysAgo;
  
  if(selectedListItem !== null) {
    const differenceInMs = now - selectedListItem;
    daysAgo = Math.floor(
    differenceInMs / (1000 * 60 * 60 * 24)
  );}

  const handleNoteChange = (id: number, newTitle: string, newNote: string): void => {
    
    //if both arent edited
    if(!newTitle.trim() && !newNote.trim()) {
      setNote((prevTitle) =>
        prevTitle.map((note) =>
            note.id === id ? { ...note} : note )
      );

      setNote((prevNote) =>
      prevNote.map((note) =>
          note.id === id ? { ...note} : note )
      );

      setEditingId(null);
      setEditedTitle("");
      setEditedNote("");
      return;
    }


    //if title is not edited, keep current title, change note
    if(!newTitle.trim()) {
      setNote((prevTitle) =>
        prevTitle.map((note) =>
            note.id === id ? { ...note} : note )
      );

      setNote((prevNote) =>
      prevNote.map((note) =>
          note.id === id ? { ...note, content: newNote} : note )
      );

    setEditingId(null);
    setEditedTitle("");
    setEditedNote("");
    return;
    }
    
    //if note isnt edited, keep note, change title
    if(!newNote.trim()) {
    setNote((prevTitle) =>
        prevTitle.map((note) =>
            note.id === id ? { ...note, title: newTitle} : note )
    );

    setNote((prevNote) =>
      prevNote.map((note) =>
          note.id === id ? { ...note} : note )
      );

    setEditingId(null);
    setEditedTitle("");
    setEditedNote("");
    return;
    }


    //If both are edited, change both
    setNote((prevTitle) =>
        prevTitle.map((note) =>
            note.id === id ? { ...note, title: newTitle} : note )
    );

    setNote((prevNote) =>
    prevNote.map((note) =>
        note.id === id ? { ...note, content: newNote} : note )
    );

    setEditingId(null);
    setEditedTitle("");
    setEditedNote("");
  };

  const handleDelete = (id: number) => {
        setNote(prev => prev.filter(prev => prev.id != id));
    }
  
  return (
    <>
          {!expanded &&
          <div className="note-card" onClick={onClick}>
              <p className="note-card-title">{note.title}</p>
              <p className="note-card-description">
                {note.content}
              </p>
              <p className="note-card-date">Edited {daysAgo} Days ago...</p>
            </div> 
          }

            {expanded &&
              <div className="note-card-expanded">
                  <button className="note-card-close-btn" onClick={() => setExpandedNoteId(null) }>
                    <img src={close} alt="close"/>
                  </button>
                  <p className="note-card-title-expanded">{note.title}</p>
                  <p className="note-card-description-expanded">{note.content}</p>
                  <div className="bottom-content">
                    <p className="note-card-date-expanded">Edited {daysAgo} Days ago...</p>
                    <button className="note-card-edit-btn" onClick={() => setEditingId(expandedNoteId)}><img src={edit} alt="edit"/></button>
                    <button className="note-card-delete-btn" onClick={() => handleDelete(expandedNoteId)}><img src={erase} alt="delete"/></button>
                  </div>
                </div>
            }

            {(editingId === note.id && expanded) &&
                    <div className="note-card-expanded">
                      <button className="note-card-close-btn" onClick={() => setExpandedNoteId(null) }>
                      <img src={close} alt="close"/>
                      </button>

                      <input
                        key={note.id}
                        placeholder={`${note.title}...`}
                        required
                        className="edit-title"
                        maxLength={30}
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <textarea
                        key={note.id}
                        className='edit-content'
                        placeholder={`${note.content}...`}
                        value={editedNote}
                        onChange={(e) => setEditedNote(e.target.value)}
                      />

                      <button className="note-card-save-btn" onClick={() => handleNoteChange(note.id, editedTitle, editedNote)}><img src={save} alt="save"/></button>
                    </div>
              }
    </>
    
  );
}

export default NoteCard;
