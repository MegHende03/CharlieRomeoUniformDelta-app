import "./SideBar.css";
import { useState } from 'react';
import logo from '../../assets/noteLogo.svg';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/closeLogo.svg';
import FormDialog from '../dialog/FormDialog'
import type { Note, Notebook } from '../../pages/HomePage';

interface SidebarProps {
    selectedListItem: number | null;
    setSelectedListItem: React.Dispatch<React.SetStateAction<number | null>>;
    setNote: React.Dispatch<React.SetStateAction<Note[]>>;
    note: Note[];
    notebook: Notebook[];
    setNotebook: React.Dispatch<React.SetStateAction<Notebook[]>>;
};

function SideBar({ selectedListItem, setSelectedListItem, setNote, note, notebook, setNotebook} : SidebarProps) {

    const [notebookInputValue, setNotebookInputValue] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const addNotebook = () => {
        setEditingId(null);
        if(!notebookInputValue.trim()) return;
        const newNotebook = {id: Date.now(), name: notebookInputValue};
        setNotebook((prev) => [newNotebook, ...prev]);
        setNotebookInputValue("");
        setIsAdding(false);
    };

    const handleNameChangeSubmit = (id: number, newName: string): void => {
        if(!newName.trim()) {
            setEditingId(null);
            setNotebookInputValue("");
            return;
        }
        setNotebook((prevNotebook) =>
            prevNotebook.map((notebook) =>
                notebook.id === id ? { ...notebook, name: newName} : notebook )
        );

        setEditingId(null);
        setNotebookInputValue("");
    };

    const handleEdit = (id: number) => {
        setIsAdding(false);
        setEditingId(id);
    }

    const handleDelete = (id: number) => {
        const updatedNotebook = notebook.filter(notebook => notebook.id != id);
        setNotebook(updatedNotebook);

        const updatedNote = note.filter(note => note.notebookId != id);
        setNote(updatedNote);
    }


    return (
        <>
            <aside className="side-bar">
                
                <div className = "logo-title">
                    <img className="logo-img" src={logo} alt="Logo" />
                    <h1>notekeeper</h1>
                </div>

                <FormDialog selectedListItem={selectedListItem} setNote={setNote} note={note} />
                
                <div className="notebook">
                    <label><h2>NOTEBOOKS</h2></label>
                    <button className="plus-btn" onClick={() => setIsAdding(true)}> + </button>
                </div>

                <ul className="notebook-list">

                    {isAdding && 
                    <div className="add-notebook">
                        <input 
                            autoFocus
                            maxLength={15}
                            className="add-notebook-input"
                            type="text"
                            placeholder="New Notebook..."
                            value={notebookInputValue}
                            onChange={(e) => setNotebookInputValue(e.target.value)}
                            onKeyDown={(e) => { 
                                if (e.key === "Enter") {
                                    addNotebook();
                                }
                            }}
                        />
                        {!notebookInputValue.trim() ? 
                        (<button type="submit" onClick={() => setIsAdding(false)} className="checkmark-close"><img src={close} alt="close" /></button>) : 
                        (<button type="submit" onClick={addNotebook} className="checkmark-close"><img src={checkmark} alt="checkmark" /></button>)}

                    </div>
                }

                    
                    {notebook.map((notebook) => (
                        <div key={notebook.id}>
                                <li onClick={() => 
                                    setSelectedListItem(notebook.id)}
                                    className={selectedListItem === notebook.id ? "notebook-item-active" : "notebook-item"}>
                                    {(editingId === notebook.id && !isAdding) ? (
                                        <>
                                            <input
                                                autoFocus
                                                key={notebook.id}
                                                maxLength={15}
                                                className="add-notebook-input"
                                                type="text"
                                                placeholder={`${notebook.name}...`}
                                                value={notebookInputValue}
                                                onChange={(e) => setNotebookInputValue(e.target.value)} 
                                                onKeyDown={(e) => { 
                                                    if (e.key === "Enter") {
                                                        handleNameChangeSubmit(notebook.id, notebookInputValue);
                                                    }
                                                }}
                                            />
                                    
                                            {!notebookInputValue.trim() ? (<button type="submit" onClick={() => handleNameChangeSubmit(notebook.id, notebookInputValue)} className="checkmark">
                                                <img src={close} alt="close" /></button>) :
                                                (<button type="submit" onClick={() => handleNameChangeSubmit(notebook.id, notebookInputValue)} className="checkmark">
                                                    <img src={checkmark} alt="checkmark" /></button>)
                                            }
                                        </>
                                    ) : (
                                        <>
                                            {notebook.name}
                                            <button className="edit-btn" onClick={() => handleEdit(notebook.id)}><img src={edit} alt="edit button" /></button>
                                            <button className="delete-btn" onClick={() => handleDelete(notebook.id)}><img src={erase} alt="edit button" /></button>
                                        </>
                                    )}   
                                </li>
                    
                        </div>    
                    ))}

                </ul>
 

            </aside>
            
        </>
    );
}

export default SideBar;