import "./NoteCard.css";
import type { Note } from '../../api/noteAPI';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import close from '../../assets/closeLogo.svg';
import save from '../../assets/saveLogo.svg';
import { useState } from 'react';
import { updateNote, deleteNote } from "../../api/noteAPI";

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

  const getDaysAgo = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt).getTime();
  const now = Date.now();

  const differenceInMs = now - updatedDate;
  const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    return "Today...";
  }

  if (daysAgo === 1) {
    return "1 day ago...";
  }

  return `${daysAgo} days ago...`;
};

  const handleNoteChange = async (id: number, newTitle: string, newContent: string)
    :Promise<void> => {
      const finalTitle = newTitle.trim() ? newTitle : note.title;
      const finalContent = newContent.trim() ? newContent : note.content;

      try {
       const updatedNote = await updateNote(id, {
        title: finalTitle,
        content: finalContent,
      });

        setNote((prevNotes) =>
          prevNotes.map((note) =>
           note.id === id ? updatedNote : note
        )
      );
    
      setEditingId(null);
      setEditedTitle("");
      setEditedNote("");
    } catch (error) {
      console.log("Failed to update note:", error);
    }

  };
    

  const handleDelete = async (id: number | null) => {
  if (id === null) return;

  try {
    await deleteNote(id);

    setNote((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );

    setExpandedNoteId(null);
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
}
  
  return (
    <>
          {!expanded &&
          <div className="note-card" onClick={onClick}>
              <p className="note-card-title">{note.title}</p>
              <p className="note-card-description">
                {note.content}
              </p>
              <p className="note-card-date">Edited {getDaysAgo(note.updatedAt)}</p>
            </div> 
          }

            {expanded && editingId !== note.id && (
              <div className="note-card-expanded">
                  <button className="note-card-close-btn" onClick={() => setExpandedNoteId(null) }>
                    <img src={close} alt="close"/>
                  </button>
                  <p className="note-card-title-expanded">{note.title}</p>
                  <p className="note-card-description-expanded">{note.content}</p>
                  <div className="bottom-content">
                    <p className="note-card-date">Edited {getDaysAgo(note.updatedAt)}</p>
                    <button className="note-card-edit-btn" onClick={() => {
                        setEditingId(note.id);
                        setEditedTitle(note.title);
                        setEditedNote(note.content);}}>
                          <img src={edit} alt="edit"/>
                    </button>
                    <button className="note-card-delete-btn" onClick={() => handleDelete(expandedNoteId)}><img src={erase} alt="delete"/></button>
                  </div>
                </div>
            )}

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

                      <button  className="note-card-save-btn" onClick={() => handleNoteChange(note.id, editedTitle, editedNote)}><img src={save} alt="save"/></button>
                    </div>
              }
    </>
    
  );
}

export default NoteCard;
