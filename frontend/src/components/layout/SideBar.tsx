import "./SideBar.css";
import { useState } from 'react';
import Modal from 'react-modal';
import logo from '../../assets/noteLogo.svg';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import checkmark from '../../assets/checkmark.svg';

function SideBar() {

    type Notebook = {
        id: number;
        name: string;
    };

    const [notebook, setNotebook] = useState<Notebook[]>([]);
    const [notebookInputValue, setNotebookInputValue] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedListItem, setSelectedListItem] =  useState<number | null>(null);

    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState<string>('');
    const [noteInputValue, setNoteInputValue] = useState<string>('');
    

    const setAddNoteOpen = () => {setIsAddNoteOpen(true);};
    const setAddNoteClosed = () => {setIsAddNoteOpen(false);};

    const addNotebook = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!notebookInputValue.trim()) return;
        const newNotebook = {id: Date.now(), name: notebookInputValue};
        setNotebook((prev) => [newNotebook, ...prev]);
        setNotebookInputValue("");
        setIsEditing(false);
    };


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
                            top: '100px',
                            left: '500px',
                            right: '500px',
                            bottom: '100px',
                            border: '1px solid #070303',
                            background: '#1b1919',
                            overflow: 'auto',
                            borderRadius: '20px',
                            outline: 'none',
                            padding: '20px',
                            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.5)'
                        }
                    }}
                >

                     <label>
                        Title:
                        <input 
                            type="text"
                            placeholder="Enter a title..."
                            value={titleInputValue}
                            onChange={(e) => setTitleInputValue(e.target.value)}
                         />
                    </label>

                    <label>
                        Write a note:
                        <textarea 
                            className="add-note" 
                            placeholder="Enter a note..."
                            value={noteInputValue}
                            onChange={(e) => setNoteInputValue(e.target.value)}
                        />
                    </label>

                    <button onClick={setAddNoteClosed}>Close</button>
                </Modal>


                <div className="notebook">
                    <label><h2>NOTEBOOKS</h2></label>
                    <button className="plus-btn" onClick={() => setIsEditing(true)}> + </button>
                </div>

                <ul className="notebook-list">

                    {isEditing && 
                    <div className="add-notebook">
                        <input 
                            maxLength={15}
                            className="add-notebook-input"
                            type="text"
                            placeholder="New Notebook..."
                            value={notebookInputValue}
                            onChange={(e) => setNotebookInputValue(e.target.value)} />
                        <button type="submit" onClick={addNotebook} className="checkmark"><img src={checkmark} alt="checkmark" /></button>
                    </div>
                }
                    
                    {notebook.map((notebook) => (
                        <div key={notebook.id}>
                            <li 
                                onClick={() => setSelectedListItem(notebook.id)}
                                className={selectedListItem === notebook.id ? "notebook-item-active" : "notebook-item"}>
                                    {notebook.name}
                                <button className="edit-btn"><img src={edit} alt="edit button" /></button>
                                <button className="delete-btn"><img src={erase} alt="edit button" /></button>
                            </li>
                        </div>    
                    ))}

                </ul>
 

            </aside>
            
        </>
    );
}

export default SideBar;