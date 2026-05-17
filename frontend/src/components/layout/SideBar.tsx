import "./SideBar.css";
import { useState } from 'react';
import Modal from 'react-modal';
import logo from '../../assets/noteLogo.svg';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/closeLogo.svg';

function SideBar() {

    type Notebook = {
        id: number;
        name: string;
    };

    type Note = {
        id: number;
        title: string;
        content: string;
        date: Date;
    }

    const [notebook, setNotebook] = useState<Notebook[]>([]);
    const [notebookInputValue, setNotebookInputValue] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const [selectedListItem, setSelectedListItem] =  useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [note, setNote] = useState<Note[]>([]);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState<string>('');
    const [noteInputValue, setNoteInputValue] = useState<string>('');
    

    const setAddNoteOpen = () => {setIsAddNoteOpen(true);};
    const setAddNoteClosed = () => {setIsAddNoteOpen(false);};

    const addNotebook = () => {
        console.log("In addNotebook");
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
    }



    return (
        <>
            <aside className="side-bar">
                
                <div className = "logo-title">
                    <img className="logo-img" src={logo} alt="Logo" />
                    <h1>notekeeper</h1>
                </div>

                <button className="new-note-btn" onClick={setAddNoteOpen}><span className="plus">+</span>
                 New note</button>

                 <Modal isOpen={isAddNoteOpen}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(46, 45, 45, 0.75)'
                        },
                        content: {
                            position: 'absolute',
                            top: '150px',
                            left: '600px',
                            right: '600px',
                            bottom: '150px',
                            border: '1px solid #070303',
                            background: '#1b1919',
                            overflow: 'auto',
                            borderRadius: '20px',
                            outline: 'none',
                            padding: '20px',
                            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.5)'
                        }
                    }}
                >           <div>Enter a new note:</div>
                            <input 
                                className="title-input"
                                type="text"
                                placeholder="Enter a title..."
                                value={titleInputValue}
                              
                            />
                            
                        
                        <textarea 
                            className="note-input" 
                            placeholder="Enter a note..."
                            value={noteInputValue}
                           
                        />

                    <button onClick={setAddNoteClosed}>Close</button>
                </Modal>


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
                                console.log(e.key);
                                if (e.key === "Enter") {
                                    addNotebook();
                                }
                            }}
                        />
                        {!notebookInputValue.trim() ? 
                        (<button type="submit" onClick={() => setIsAdding(false)} className="checkmark"><img src={close} alt="close" /></button>) : 
                        (<button type="submit" onClick={addNotebook} className="checkmark"><img src={checkmark} alt="checkmark" /></button>)}

                    </div>
                }

                    
                    {notebook.map((notebook) => (
                        <div key={notebook.id}>
                                <li onClick={() => setSelectedListItem(notebook.id)}
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
                                                    console.log(e.key);
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