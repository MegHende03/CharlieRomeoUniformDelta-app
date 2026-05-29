import "./SideBar.css";
import { useState, useEffect } from 'react';
import logo from '../../assets/noteLogo.svg';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/closeLogo.svg';
import FormDialog from '../dialog/FormDialog'
import type { Note } from '../../api/noteAPI';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { getNotebooks,
        createNotebook,
        updateNotebook,
        deleteNotebook,
        type Notebook,
}   from "../../api/notebookAPI";

interface SidebarProps {
    selectedListItem: number | null;
    setSelectedListItem: React.Dispatch<React.SetStateAction<number | null>>;
    setNote: React.Dispatch<React.SetStateAction<Note[]>>;
    note: Note[];
    notebook: Notebook[];
    setNotebook: React.Dispatch<React.SetStateAction<Notebook[]>>;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function SideBar({ selectedListItem, setSelectedListItem, setNote, note, notebook, setNotebook} : SidebarProps) {

    const [notebookInputValue, setNotebookInputValue] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        async function loadNotebooks() {
            try {
                const data = await getNotebooks();
                setNotebook(data);
                } catch (error) {
                console.error("Failed to load notebooks:", error);
                }
        }

        loadNotebooks();
        }, [setNotebook]);

    const addNotebook = async () => {
        setEditingId(null);

        if (!notebookInputValue.trim()) return;

        try {
            const newNotebook = await createNotebook({
                name: notebookInputValue,
            });

            setNotebook((prev) => [newNotebook, ...prev]);
            setNotebookInputValue("");
            setIsAdding(false);
        } catch (error) {
            console.error("Failed to create notebook:", error);
        }
        };

    const handleNameChangeSubmit = async (
        id: number,
        newName: string
        ): Promise<void> => {
        if (!newName.trim()) {
            setEditingId(null);
            setNotebookInputValue("");
            return;
    }

    try {
        const updatedNotebook = await updateNotebook(id, {
            name: newName,
        });

        setNotebook((prevNotebook) =>
            prevNotebook.map((notebook) =>
                notebook.id === id ? updatedNotebook : notebook
        )
        );

        setEditingId(null);
        setNotebookInputValue("");
    } catch (error) {
        console.error("Failed to update notebook:", error);
    }
    };

    const handleEdit = (id: number, currentName: string) => {
        setIsAdding(false);
        setEditingId(id);
        setNotebookInputValue(currentName);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteNotebook(id);

            setNotebook((prev) =>
            prev.filter((notebook) => notebook.id !== id)
            );

            setNote((prev) =>
            prev.filter((note) => note.notebookId !== id)
            );

            if (selectedListItem === id) {
            setSelectedListItem(null);
            }
        } catch (error) {
            console.error("Failed to delete notebook:", error);
        }
    };


    return (
        <>
            <aside className="side-bar">
                
                <div className = "logo-title">
                    <img className="logo-img" src={logo} alt="Logo" />
                    <h1>notekeeper</h1>
                </div>

                <ThemeProvider theme={darkTheme}>
                    
                <FormDialog selectedListItem={selectedListItem} setNote={setNote} note={note} />
                
                </ThemeProvider>
                
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
                        (<button type="submit" onClick={() => setIsAdding(false)} className="checkmark"><img src={close} alt="close" /></button>) : 
                        (<button type="submit" onClick={addNotebook} className="checkmark"><img src={checkmark} alt="checkmark" /></button>)}

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
                                            <button className="edit-btn" onClick={(e) => {e.stopPropagation();
                                                handleEdit(notebook.id, notebook.name);}}><img src={edit} alt="edit button" /></button>
                                            <button className="delete-btn" onClick={(e) => {e.stopPropagation();
                                                handleDelete(notebook.id);
                                                }}><img src={erase} alt="edit button" /></button>
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