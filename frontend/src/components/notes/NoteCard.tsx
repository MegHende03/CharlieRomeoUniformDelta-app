import "./NoteCard.css";
import type { Note } from '../../pages/HomePage';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import close from '../../assets/closeLogo.svg';
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

  const [editedInput, setEditedInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const expanded = expandedNoteId === note.id;

  const now = Date.now();
  let daysAgo;
  
  if(selectedListItem !== null) {
    const differenceInMs = now - selectedListItem;
    daysAgo = Math.floor(
    differenceInMs / (1000 * 60 * 60 * 24)
  );}

  const handleTitleChange = (id: number, newTitle: string): void => {
    if(!newTitle.trim()) {
        setEditingId(null);
        setEditedInput("");
        return;
    }
    setNote((prevTitle) =>
        prevTitle.map((note) =>
            note.id === id ? { ...note, title: newTitle} : note )
    );

    setEditingId(null);
    setEditedInput("");
  };

  
  return (
    <>
          {!expanded &&
          <div className="note-card" onClick={onClick}>
              <p className="note-card-title">{note.title}</p>
              <p className="note-card-description">
                {note.content}
              </p>
              <p className="note-card-date">{daysAgo} Days ago...</p>
            </div> 
          }

            {expanded &&
              <div className="note-card-expanded">
                  <button className="note-card-close-btn" onClick={() => setExpandedNoteId(null) }>
                    <img src={close} alt="close"/>
                  </button>
                  <p className="note-card-title">{note.title}</p>
                  <p className="note-card-description">
                    {note.content}
                  </p>
                  <p className="note-card-date">{daysAgo} Days ago...</p>
                  <button className="note-card-edit-btn" onClick={() => setEditingId(expandedNoteId)}><img src={edit} alt="edit"/></button>
                  <button className="note-card-delete-btn"><img src={erase} alt="delete"/></button>

                </div>
            }

            {(editingId === note.id && expanded) &&
                    <div className="note-card-expanded">
                      <button className="note-card-close-btn" onClick={() => setExpandedNoteId(null) }>
                      <img src={close} alt="close"/>
                      </button>

                      <input
                        key={note.id}
                        placeholder={note.title}
                        required
                        className="edit-title"
                        maxLength={30}
                        value={editedInput}
                        onChange={(e) => setEditedInput(e.target.value)}
                        onKeyDown={(e) => { 
                          if (e.key === "Enter") {
                              handleTitleChange(note.id, editedInput);}
                        }}
                      />
                      <textarea
                        className='edit-content'
                        placeholder= {note.content}
                        required
                      />
                    </div>
              }
    </>
    
  );
}

export default NoteCard;
